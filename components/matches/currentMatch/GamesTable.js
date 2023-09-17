import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import GameEditControls from "./GameEditControls";
import PlayersHeader from "./PlayersHeader";
import AddGameButton from "./AddGameButton";
import BreakAndRunCheckBox from "./BreakAndRunCheckBox";

import {
  addGame,
  editGame,
  deleteGame,
  updateMatchDetails,
  gamesRef,
  fetchGamesRealTime,
} from "../../../util/firebase/firebaseDb";
import * as Crypto from "expo-crypto";
import { calculateWins } from "../../../helpers/games/gameHelpers";
import { AuthContext } from "../../../store/context/AuthContext";
import { Colors } from "../../../constants/colors";
import GameList from "./GameList";

export default function GamesTable({
  leagueType,
  opponentFirstName,
  opponentLastName,
  bracket,
  matchId, // Capture the matchId from the props
}) {
  const userCtx = useContext(AuthContext);

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [breakAndRun, setBreakAndRun] = useState(false);
  const [userBreakAndRuns, setUserBreakAndRuns] = useState(0);
  const [opponentBreakAndRuns, setOpponentBreakAndRuns] = useState(0);

  const userFullName = `${userCtx.firstName} ${userCtx.lastName}`;
  const opponentFullName = `${opponentFirstName} ${opponentLastName}`;

  const userWins = calculateWins(games, userFullName);
  const opponentWins = calculateWins(games, opponentFullName);

  useEffect(() => {
    const dbRef = gamesRef(leagueType, bracket, matchId);
    const unsubscribe = fetchGamesRealTime(dbRef, setGames);

    return () => {
      unsubscribe();
    };
  }, [leagueType, bracket, matchId, selectedGame]);

  const addGameHandler = async (player) => {
    const newGame = {
      winner: player,
      breakAndRun: breakAndRun,
    };
    const newGameId = games.length + Crypto.randomUUID();

    try {
      await addGame(leagueType, bracket, matchId, newGame, newGameId);

      if (breakAndRun) {
        if (player === userFullName) {
          setUserBreakAndRuns((prevCount) => prevCount + 1);
        } else if (player === opponentFullName) {
          setOpponentBreakAndRuns((prevCount) => prevCount + 1);
        }
      }

      const updatedGames = fetchGamesRealTime(leagueType, bracket, matchId);
      setGames(updatedGames);

      setBreakAndRun(!!false);
    } catch (error) {}
  };

  const editGameHandler = async (gameId, editedData) => {
    try {
      await editGame(leagueType, bracket, matchId, gameId.id, editedData);
      const updatedGames = fetchGamesRealTime(leagueType, bracket, matchId);
      setGames(updatedGames);
      setBreakAndRun(!!false);
    } catch (error) {}
  };

  const deleteGameHandler = async (gameId) => {
    try {
      await deleteGame(leagueType, bracket, matchId, gameId);
      const updatedGames = fetchGamesRealTime(leagueType, bracket, matchId);
      setGames(updatedGames);
    } catch (error) {}
  };

  const toggleBreakAndRunHandler = () => {
    setBreakAndRun((prevState) => !prevState);
  };

  const handleSubmitMatch = async () => {
    const matchDetails = {
      status: "Finished",
      [userFullName]: { wins: userWins, breakAndRuns: userBreakAndRuns },
      [opponentFullName]: {
        wins: opponentWins,
        breakAndRuns: opponentBreakAndRuns,
      },
    };
    try {
      await updateMatchDetails(leagueType, bracket, matchId, matchDetails);
      alert("Match details updated!");
    } catch (error) {
      // Handle the error
    }
  };

  // Check if max games have been reached
  const isMaxGamesReached = userWins >= 7 || opponentWins >= 7;

  return (
    <View style={styles.container}>
      <PlayersHeader
        userCtx={userCtx}
        leagueType={leagueType}
        opponentFirstName={opponentFirstName}
        opponentLastName={opponentLastName}
        userWins={userWins}
        opponentWins={opponentWins}
      />
      <GameList
        games={games}
        userCtx={userCtx}
        opponentFirstName={opponentFirstName}
        opponentLastName={opponentLastName}
        onEditGame={setSelectedGame}
        onDeleteGame={deleteGameHandler}
        userFullName={userFullName}
      />
      {selectedGame !== null ? (
        <GameEditControls
          userCtx={userCtx}
          onCancel={() => setSelectedGame(null)}
          breakAndRun={breakAndRun}
          setBreakAndRun={setBreakAndRun}
          toggleBreakAndRun={toggleBreakAndRunHandler}
          gameNumber={games.findIndex((game) => game.id === selectedGame.id)}
          opponentFullName={opponentFullName}
          userFullName={userFullName}
          onEditGame={(editedData) => {
            editGameHandler(selectedGame, editedData);
          }}
        />
      ) : (
        <>
          <View style={styles.buttonContainer}>
            {["player1", "player2"].map((player) => {
              const playerName =
                player === "player1" ? userFullName : opponentFullName;
              return (
                <AddGameButton
                  key={player}
                  playerName={playerName}
                  onPress={() => addGameHandler(playerName)}
                  isDisabled={isMaxGamesReached}
                />
              );
            })}
          </View>
          <BreakAndRunCheckBox
            value={breakAndRun}
            onValueChange={toggleBreakAndRunHandler}
          />
        </>
      )}
      {isMaxGamesReached && (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitMatch}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary500,
    flex: 1,
    padding: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  submitButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15, // Increased padding for better touch area
    marginTop: 20,
    marginHorizontal: 10, // Changed from margin to marginHorizontal for better spacing
    backgroundColor: Colors.primary400,
    borderRadius: 8,
    width: 150,
    height: 50,
    maxHeight: 50,
    shadowColor: Colors.primary600,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // For android shadow
  },
});
