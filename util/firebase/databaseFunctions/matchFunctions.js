import { fetchData, buildRef, writeData } from "./firebase-utils";
import { onValue } from "firebase/database";
// Generate a Firebase database reference for a specific match within a given bracket and league
export const getMatchRef = (leagueType, bracket, matchId) => {
  return buildRef(
    `leagues/${leagueType}/brackets/${bracket}/matches/${matchId}`
  );
};

// Add a match in Firebase for the given players, league, and bracket
export const addMatch = async (player1, player2, leagueType, bracketId) => {
  const newMatchId1 = `${player1} Vs ${player2}`;
  const newMatchId2 = `${player2} Vs ${player1}`;
  const existingData1 = await fetchData(
    buildRef(
      `leagues/${leagueType}/brackets/${bracketId}/matches/${newMatchId1}`
    )
  );
  const existingData2 = await fetchData(
    buildRef(
      `leagues/${leagueType}/brackets/${bracketId}/matches/${newMatchId2}`
    )
  );
  const matchData = existingData1 ||
    existingData2 || {
      player1,
      player2,
      status: "Ongoing",
      matchWinner: "",
      date: "TBD",
      time: "TBD",
    }; // Adding "TBD" as the initial date
  const matchId = existingData1 ? newMatchId1 : newMatchId2;

  await writeData(
    buildRef(`leagues/${leagueType}/brackets/${bracketId}/matches/${matchId}`),
    matchData
  );

  return matchId;
};

// Update match details in Firebase
export const updateMatchDetails = async (
  leagueType,
  bracket,
  matchId,
  matchDetails
) => {
  // Get the current date
  const currentDate = new Date();

  // Extract day, month, and year from the current date
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const year = currentDate.getFullYear();

  // Extract hours, minutes, and seconds from the current date
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Add the current date and time to the matchDetails
  matchDetails.date = `${month}/${day}/${year}`;
  matchDetails.time = `${hours}:${minutes}:${seconds}`;

  await writeData(
    buildRef(`leagues/${leagueType}/brackets/${bracket}/matches/${matchId}`),
    matchDetails
  );
};

// Fetch match status in real-time and invoke the callback with the updated match status
// The function returns a Firebase subscription that can be used to unsubscribe from updates
export const fetchMatchDetails = async (leagueType, bracket, matchId) => {
  const matchRef = getMatchRef(leagueType, bracket, matchId);
  let matchDetails;
  try {
    const snapshot = await matchRef.get();
    if (snapshot.exists) {
      matchDetails = snapshot.data();
    }
  } catch (error) {
    // Handle the error
  }
  return matchDetails;
};
export const subscribeToMatchStatus = (
  leagueType,
  bracket,
  matchId,
  callback
) => {
  const matchRef = getMatchRef(leagueType, bracket, matchId);
  const unsubscribe = onValue(matchRef, (snapshot) => {
    const matchDetails = snapshot.val();
    callback(matchDetails);
  });

  return unsubscribe;
};

// Filter matches based on the given criteria
const filterMatches = (matchesData, filters) => {
  if (!matchesData) return [];
  return Object.keys(matchesData)
    .map((matchId) => {
      const match = matchesData[matchId];
      const { status } = match;
      if (
        filters.status.includes(status) &&
        filters.userNames.every((name) => matchId.includes(name))
      ) {
        return {
          matchId,
          opponent: filters.userNames.find((name) => !matchId.includes(name)),
          status,
        };
      }
      return null;
    })
    .filter(Boolean);
};

// Fetch finished matches for a user in a league and bracket
export const fetchMatchesForBracket = async (leagueType, bracketId) => {
  const matchesData = await fetchData(
    buildRef(`leagues/${leagueType}/brackets/${bracketId}/matches`)
  );
  return matchesData ? Object.values(matchesData) : [];
};

// Fetch finished matches between two players in a league and bracket
export const fetchFinishedMatchesBetweenTwoPlayers = async (
  userName,
  opponentName,
  leagueType,
  bracketId
) => {
  const matchesData = await fetchData(
    buildRef(`leagues/${leagueType}/brackets/${bracketId}/matches`)
  );
  return filterMatches(matchesData, {
    status: ["Finished"],
    userNames: [userName, opponentName],
  });
};
