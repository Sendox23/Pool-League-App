import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

export default function ScoreContainer({
  userFullName,
  opponentName,
  userWins,
  userBreakAndRuns,
  opponentWins,
  opponentBreakAndRuns,
}) {
  return (
    <View style={styles.scoreContainer}>
      <Text style={styles.header}>Match Results</Text>

      <Text style={styles.name}>{userFullName}</Text>
      <Text style={styles.scoreText}>Wins: {userWins}</Text>
      {userBreakAndRuns > 0 && (
        <Text style={styles.scoreText}>Break and Runs: {userBreakAndRuns}</Text>
      )}

      <Text style={styles.name}>{opponentName}</Text>
      <Text style={styles.scoreText}>Wins: {opponentWins}</Text>

      {opponentBreakAndRuns > 0 && (
        <Text style={styles.scoreText}>Break and Runs: {opponentBreakAndRuns}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scoreContainer: {
    marginTop: 10,
    marginBottom: 30,
    width: "80%",
    padding: 15,
    backgroundColor: Colors.primary100,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    elevation: 5, // Android elevation
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 3.84, // iOS shadow
  },

  // Styles for the header (Match Results)
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },

  // Styles for player names
  name: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },

  // Styles for score text
  scoreText: {
    fontSize: 18,
    color: "#333",
    marginVertical: 2,
    textAlign: "center",
  },
});
