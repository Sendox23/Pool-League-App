import { buildRef, writeData } from "./firebase-utils";
import { onValue, remove } from "firebase/database";
// Add a game to a match in Firebase
export const addGame = async (
  leagueType,
  bracket,
  matchId,
  gameData,
  newGameId
) => {
  await writeData(
    buildRef(
      `leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games/${newGameId}`
    ),
    gameData
  );
};

// Edit game data in Firebase
export const editGame = async (
  leagueType,
  bracket,
  matchId,
  gameId,
  editedData
) => {
  await writeData(
    buildRef(
      `leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games/${gameId}`
    ),
    editedData
  );
};

// Delete a game from Firebase
export const deleteGame = async (leagueType, bracket, matchId, gameId) => {
  await remove(
    buildRef(
      `leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games/${gameId}`
    )
  );
};

// Generate a Firebase database reference for games within a specific match, bracket, and league
export const gamesRef = (leagueType, bracket, matchId) =>
  buildRef(
    `leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games`
  );

// Fetch games in real-time and invoke the callback with the updated game list
// The function returns a Firebase subscription that can be used to unsubscribe from updates
export const fetchGamesRealTime = (dbRef, callback) => {
  return onValue(dbRef, (snapshot) => {
    const gamesData = snapshot.val();
    callback(
      gamesData
        ? Object.keys(gamesData).map((key) => ({ id: key, ...gamesData[key] }))
        : []
    );
  });
};
