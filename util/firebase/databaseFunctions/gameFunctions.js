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
  try {
    await writeData(
      buildRef(
        `leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games/${newGameId}`
      ),
      gameData
    );
  } catch (error) {
    console.error("Error adding game: ", error);
  }
};

// Edit game data in Firebase
export const editGame = async (
  leagueType,
  bracket,
  matchId,
  gameId,
  editedData
) => {
  try {
    await writeData(
      buildRef(
        `leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games/${gameId}`
      ),
      editedData
    );
  } catch (error) {
    console.error("Error editing game: ", error);
  }
};

// Delete a game from Firebase
export const deleteGame = async (leagueType, bracket, matchId, gameId) => {
  try {
    await remove(
      buildRef(
        `leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games/${gameId}`
      )
    );
  } catch (error) {
    console.error("Error deleting game: ", error);
  }
};

// Generate a Firebase database reference for games within a specific match, bracket, and league
export const gamesRef = (leagueType, bracket, matchId) => {
  try {
    return buildRef(
      `leagues/${leagueType}/brackets/${bracket}/matches/${matchId}/games`
    );
  } catch (error) {
    console.error("Error generating game reference: ", error);
  }
};

// Fetch games in real-time and invoke the callback with the updated game list
// The function returns a Firebase subscription that can be used to unsubscribe from updates
export const fetchGamesRealTime = (dbRef, callback) => {
  try {
    return onValue(dbRef, (snapshot) => {
      const gamesData = snapshot.val();
      callback(
        gamesData
          ? Object.keys(gamesData).map((key) => ({ id: key, ...gamesData[key] }))
          : []
      );
    });
  } catch (error) {
    console.error("Error fetching games in real-time: ", error);
  }
};