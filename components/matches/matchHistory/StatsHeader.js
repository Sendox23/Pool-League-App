import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsHeader = ({ matches }) => {
  const totalMatches = matches.length;
  const matchesWon = matches.filter(
    (match) => match.winner === match.user
  ).length;

  const totalGames = matches.reduce(
    (acc, match) => acc + match.userWins + match.opponentWins,
    0
  );
  const gamesWon = matches.reduce((acc, match) => acc + match.userWins, 0);

  const matchWinPercentage = ((matchesWon / totalMatches) * 100).toFixed(2);
  const gameWinPercentage = ((gamesWon / totalGames) * 100).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.statBox}>
        <Text style={styles.statTitle}>Total Matches</Text>
        <Text style={styles.statValue}>{totalMatches}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statTitle}>Matches Won</Text>
        <Text style={styles.statValue}>{matchesWon}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statTitle}>Win %</Text>
        <Text style={styles.statValue}>{matchWinPercentage}%</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statTitle}>Total Games</Text>
        <Text style={styles.statValue}>{totalGames}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statTitle}>Games Won</Text>
        <Text style={styles.statValue}>{gamesWon}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statTitle}>Win %</Text>
        <Text style={styles.statValue}>{gameWinPercentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 6,
    padding: 6,
    backgroundColor: "#f5f5f5",
  },
  statBox: {
    width: "32%",
    padding: 6,
    marginBottom: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 1,
  },
  statTitle: {
    fontSize: 12,
    color: "#555",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default StatsHeader;