import React from "react";

import LoadingSpinner from "../../ui/LoadingSpinner";

import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

export default AddGameButtons = ({
  userFullName,
  opponentName,
  isDisabled,
  addGame,
  isLoading
}) => {
  return (
    <View style={styles.buttonContainer}>
      {["player1", "player2"].map((player) => {
        const playerName =
          player === "player1" ? userFullName : opponentName;
        return (
          <TouchableOpacity
            key={player}
            style={[styles.button, isDisabled && styles.buttonDisabled]}
            onPress={() => addGame(playerName)}
            disabled={isDisabled || isLoading}
          >
            <Text style={styles.buttonText} numberOfLines={2}>
              {isLoading ? <LoadingSpinner /> : `Add Win for \n${playerName}`}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
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
  buttonDisabled: {
    backgroundColor: Colors.secondary300,
    shadowColor: "transparent",
  },
});
