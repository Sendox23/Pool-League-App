import { get, ref, set, remove, onValue } from "firebase/database";
import { database } from "./firebase";

// Helper function to generate Firebase refs
const buildRef = (path) => ref(database, path);

// General function to handle database reads
const fetchData = async (dbRef) => {
  const snapshot = await get(dbRef);
  return snapshot.exists() ? snapshot.val() : null;
};

const writeData = async (dbRef, data) => await set(dbRef, data);

// User functions
export const writeUserData = async (userId, email, phoneNumber, firstName, lastName) => {
  await writeData(buildRef(`users/${userId}`), { email, phoneNumber, firstName, lastName });
};

export const fetchUserDetailsFromDatabase = async (userId) => fetchData(buildRef(`users/${userId}`));

// League functions
export const fetchLeagues = async () => {
  const leaguesData = await fetchData(buildRef("leagues"));
  return leaguesData ? Object.keys(leaguesData).map(leagueName => ({ leagueName, ...leaguesData[leagueName] })) : null;
};

export const fetchBrackets = (league, userUid) => Object.keys(league.brackets || {})
    .map(bracketId => {
      const bracket = league.brackets[bracketId];
      return bracket.players && userUid in bracket.players ? { bracketId, ...bracket } : null;
    })
    .filter(Boolean);

export const isUserInLeague = async (userUid, leagueType) => {
  const bracketsData = await fetchData(buildRef(`leagues/${leagueType}/brackets`));
  return bracketsData ? Object.values(bracketsData).some(bracket => bracket.players && userUid in bracket.players) : false;
};

// Match functions
export const addMatch = async (player1, player2, leagueType, bracketId) => {
  const newMatchId1 = `${player1} Vs ${player2}`;
  const newMatchId2 = `${player2} Vs ${player1}`;

  const existingData1 = await fetchData(buildRef(`leagues/${leagueType}/brackets/${bracketId}/matches/${newMatchId1}`));
  const existingData2 = await fetchData(buildRef(`leagues/${leagueType}/brackets/${bracketId}/matches/${newMatchId2}`));

  const matchData = existingData1 || existingData2 || { player1, player2, status: "Ongoing", matchWinner: "" };
  const matchId = existingData1 ? newMatchId1 : newMatchId2;
  
  await writeData(buildRef(`leagues/${leagueType}/brackets/${bracketId}/matches/${matchId}`), matchData);
  
  return matchId;
};

// Game functions
export const addGame = async (leagueType, bracket, matchId, gameData, newGameId) => {
  await writeData(buildRef(`leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games/${newGameId}`), gameData);
};

export const editGame = async (leagueType, bracket, matchId, gameId, editedData) => {
  await writeData(buildRef(`leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games/${gameId}`), editedData);
};

export const deleteGame = async (leagueType, bracket, matchId, gameId) => {
  await remove(buildRef(`leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games/${gameId}`));
};

export const updateMatchDetails = async (leagueType, bracket, matchId, matchDetails) => {
  await writeData(buildRef(`leagues/${leagueType}/brackets/${bracket}/matches/${matchId}`), matchDetails);
};

export const gamesRef = (leagueType, bracket, matchId) => buildRef(`leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games`);

export const fetchGamesRealTime = (dbRef, callback) => {
  return onValue(dbRef, snapshot => {
    const gamesData = snapshot.val();
    callback(gamesData ? Object.keys(gamesData).map(key => ({ id: key, ...gamesData[key] })) : []);
  });
};