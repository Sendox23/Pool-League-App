import React from "react";
import { Text, StyleSheet } from "react-native";

export default function WinnerText({ winner, userFullName }) {
  return (
    <>
      <Text style={styles.winner}>{winner} Won</Text>
      {winner === userFullName ? (
        <Text style={styles.winnerText}>Congratulations on winning!</Text>
      ) : (
        <Text style={styles.loserText}>Better luck next time.</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  winner: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  // Styles for the winner's additional text
  winnerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00C853",
    textAlign: "center",
    marginBottom: 10,
  },

  // Styles for the loser's additional text
  loserText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#D50000",
    textAlign: "center",
    marginBottom: 10,
  },
});
