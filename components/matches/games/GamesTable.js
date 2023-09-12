import React, { useRef, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CheckBox from "expo-checkbox";
import GameRow from "./GameRow";
import GameEditControls from "./GameEditControls";
import PlayersHeader from "./PlayersHeader";

import { useGameLogic } from "../../../hooks/GameLogic";
import { AuthContext } from "../../../store/context/AuthContext";
import { Colors } from "../../../constants/colors";

export default function GamesTable({ leagueType }) {
  const userCtx = useContext(AuthContext);
  const {
    games = [],
    player1Games,
    player2Games,
    breakAndRun,
    selectedGame,
    addGame,
    setSelectedGame,
    toggleBreakAndRun,
    editGame,
    deleteGame,
  } = useGameLogic();

  const scrollViewRef = useRef(null);
  const isMaxGamesReached =
    player1Games.length >= 7 || player2Games.length >= 7;

  const addGameHandler = (player) => {
    addGame(player);
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleSubmit = () => alert("Game submitted");

  return (
    <View style={styles.container}>
      <PlayersHeader
        userCtx={userCtx}
        leagueType={leagueType}
        player1Games={player1Games}
        player2Games={player2Games}
      />
      <ScrollView style={styles.table} ref={scrollViewRef}>
        {games.map((game, index) => (
          <GameRow
            key={game.id}
            index={index}
            userCtx={userCtx}
            game={game}
            onEdit={() => setSelectedGame({ id: game.id, number: index + 1 })}
            onDelete={() => deleteGame(game.id)}
            isEditMode={selectedGame !== null}
          />
        ))}
      </ScrollView>

      {selectedGame?.id ? (
        <GameEditControls
          userCtx={userCtx}
          onEdit={(player) => editGame(selectedGame.id, player)}
          onCancel={() => setSelectedGame(null)}
          breakAndRun={breakAndRun}
          toggleBreakAndRun={toggleBreakAndRun}
          gameNumber={selectedGame.number}
        />
      ) : (
        <>
          <View style={styles.buttonContainer}>
            {["player1", "player2"].map((player, index) => (
              <TouchableOpacity
                key={player}
                style={[
                  styles.button,
                  isMaxGamesReached && styles.buttonDisabled,
                ]}
                onPress={() => addGameHandler(player)}
                disabled={isMaxGamesReached}
              >
                <Text style={styles.buttonText} numberOfLines={2}>
                  {"Add Win for \n"}
                  {player === "player1"
                    ? `${userCtx.firstName} ${userCtx.lastName}`
                    : `Player ${index + 1}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {player1Games.length < 7 && player2Games.length < 7 && (
            <View style={styles.breakAndRunContainer}>
              <CheckBox value={breakAndRun} onValueChange={toggleBreakAndRun} />
              <Text style={styles.checkBoxText}>Break & Run</Text>
            </View>
          )}
        </>
      )}
      {isMaxGamesReached && (
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text>Submit</Text>
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
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: Colors.primary400,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary100,
    width: 150,
    height: 50, // Increased height to accommodate two lines of text
    shadowColor: Colors.primary600,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center", // Ensure text is centered
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
  buttonDisabled: {
    backgroundColor: Colors.secondary300,
    shadowColor: "transparent",
  },
  breakAndRunContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center items horizontally
    alignItems: "center", // Center items vertically
    paddingVertical: 6, // Increased vertical padding for more vertical space
    marginVertical: 5, // Added vertical margin for more spacing around
  },

  checkBoxText: {
    marginLeft: 8, // Slightly more space between checkbox and text
    color: Colors.secondary50,
    fontSize: 14, // Increased font size for clarity
    fontWeight: "500", // Made the text a bit bolder
  },
  table: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: Colors.secondary100,
    borderRadius: 8,
    backgroundColor: Colors.primary400,
    maxHeight: 300,
    shadowColor: Colors.primary600,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});
