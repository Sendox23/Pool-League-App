import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import GameEditControls from "./GameEditControls";
import PlayersHeader from "./PlayersHeader";
import AddGameButtons from "./AddGameButtons";
import BreakAndRunCheckBox from "./BreakAndRunCheckBox";
import GameList from "./GameList";
import ErrorComponent from "../../ui/ErrorComponent";

import {
  gamesRef,
  addGame,
  editGame,
  deleteGame,
  fetchGamesRealTime,
} from "../../../util/firebase/databaseFunctions/gameFunctions";
import {
  subscribeToMatchStatus,
  updateMatchDetails,
} from "../../../util/firebase/databaseFunctions/matchFunctions";
import { calculateWins } from "../../../helpers/games/gameHelpers";
import { AuthContext } from "../../../store/context/AuthContext";

import { Colors } from "../../../constants/colors";
import LoadingOverlay from "../../ui/LoadingOverlay";

export default function Games({
  navigation,
  leagueType,
  opponentName,
  bracket,
  matchId,
}) {
  const userCtx = useContext(AuthContext);

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [breakAndRun, setBreakAndRun] = useState(false);
  const [userBreakAndRuns, setUserBreakAndRuns] = useState(0);
  const [opponentBreakAndRuns, setOpponentBreakAndRuns] = useState(0);
  const [isAddingGame, setIsAddingGame] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userFullName = `${userCtx.firstName} ${userCtx.lastName}`;
  const userWins = calculateWins(games, userFullName);
  const opponentWins = calculateWins(games, opponentName);

  const commonNavParams = {
    leagueType,
    matchId,
    userFullName,
    userWins,
    opponentName,
    opponentWins,
  };

  useEffect(() => {
    const unsubscribeMatch = subscribeToMatchStatus(
      leagueType,
      bracket,
      matchId,
      (details) => {
        console.log(details);
        if (details?.status === "Finished") {
          navigation.navigate("MatchResults", {
            ...commonNavParams,
            leagueType: leagueType,
            matchId: matchId,
            userFullName: userFullName,
            userWins: details[userFullName].wins,
            opponentName: opponentName,
            opponentWins: details[opponentName].wins,
            matchDetails: details,
            winner: details.winner,
            userBreakAndRuns: details[userFullName].breakAndRuns,
            opponentBreakAndRuns: details[opponentName].breakAndRuns,
          });
        }
      }
    );

    const dbRef = gamesRef(leagueType, bracket, matchId);
    const unsubscribeGames = fetchGamesRealTime(dbRef, setGames);

    return () => {
      unsubscribeMatch();
      unsubscribeGames();
    };
  }, [matchId, leagueType, bracket, userWins, opponentWins]);

  const addGameHandler = async (player) => {
    const newGame = {
      winner: player,
      breakAndRun: breakAndRun,
    };

    const newGameId = Date.now().toString();
    setIsAddingGame(true);
    setError(null);
    try {
      await addGame(leagueType, bracket, matchId, newGame, newGameId);

      if (breakAndRun) {
        if (player === userFullName) {
          setUserBreakAndRuns((prevCount) => prevCount + 1);
        } else if (player === opponentName) {
          setOpponentBreakAndRuns((prevCount) => prevCount + 1);
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setBreakAndRun(false);
    setIsAddingGame(false);
  };

  const editGameHandler = async (gameId, editedData) => {
    try {
      await editGame(leagueType, bracket, matchId, gameId.id, editedData);
    } catch (error) {}
    setBreakAndRun(false);
    setSelectedGame(null);
  };

  const deleteGameHandler = async (gameId) => {
    try {
      await deleteGame(leagueType, bracket, matchId, gameId);
    } catch (error) {}
  };

  const toggleBreakAndRunHandler = () => {
    setBreakAndRun((prevState) => !prevState);
  };

  const handleSubmitMatch = async () => {
    const matchDetails = {
      status: "Finished",
      winner: userWins > opponentWins ? userFullName : opponentName,
      [userFullName]: { wins: userWins, breakAndRuns: userBreakAndRuns },
      [opponentName]: {
        wins: opponentWins,
        breakAndRuns: opponentBreakAndRuns,
      },
    };
    setIsLoading(true);
    setError(null);
    try {
      await updateMatchDetails(leagueType, bracket, matchId, matchDetails);
      navigation.navigate("MatchResults", {
        leagueType: leagueType,
        matchId: matchId,
        matchDetails: matchDetails,
        userFullName: userFullName,
        userWins: userWins,
        winner: matchDetails.winner,
        userBreakAndRuns: matchDetails[userFullName].breakAndRuns,
        opponentBreakAndRuns: matchDetails[opponentName].breakAndRuns,
        opponentName: opponentName,
        opponentWins: opponentWins,
      });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  // Check if max games have been reached
  const isMaxGamesReached = userWins >= 7 || opponentWins >= 7;
  const isEditing = selectedGame !== null;

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <View style={styles.container}>
      <PlayersHeader
        userCtx={userCtx}
        leagueType={leagueType}
        opponentName={opponentName}
        userWins={userWins}
        opponentWins={opponentWins}
      />
      <GameList
        games={games}
        userCtx={userCtx}
        opponentName={opponentName}
        onEditGame={setSelectedGame}
        onDeleteGame={deleteGameHandler}
        userFullName={userFullName}
        isEditing={isEditing}
      />
      {selectedGame !== null ? (
        <GameEditControls
          userCtx={userCtx}
          onCancel={() => setSelectedGame(null)}
          breakAndRun={breakAndRun}
          setBreakAndRun={setBreakAndRun}
          toggleBreakAndRun={toggleBreakAndRunHandler}
          gameNumber={games.findIndex((game) => game.id === selectedGame.id)}
          opponentName={opponentName}
          userFullName={userFullName}
          onEditGame={(editedData) => {
            editGameHandler(selectedGame, editedData);
          }}
        />
      ) : (
        <>
          <AddGameButtons
            addGame={addGameHandler}
            isDisabled={isMaxGamesReached}
            userFullName={userFullName}
            opponentName={opponentName}
            isLoading={isAddingGame}
          />

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
          <Text style={styles.buttonText}>
            {isLoading ? <LoadingSpinner /> : "Submit Match"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary800,
    flex: 1,
    padding: 20,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: Colors.primary600,
    elevation: 10,
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
