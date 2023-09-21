import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MatchItem = ({ match }) => {
  const backgroundColor =
    match.user === match.winner ? "lightgreen" : "lightcoral";

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {match.date.split("/")[0]}/{match.date.split("/")[1]}
        </Text>
      </View>
      <View style={[styles.matchContainer, { backgroundColor }]}>
        <View style={styles.header}>
          <Text style={styles.matchText}>{match.user}</Text>
          <Text style={styles.vsText}>Vs.</Text>
          <Text style={styles.matchText}>{match.opponent}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Games Won</Text>
            <Text style={styles.statValue}>{match.userWins}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Games Lost</Text>
            <Text style={styles.statValue}>{match.opponentWins}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "stretch",
    marginVertical: 6,
    borderRadius: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "#FFFFFF",
  },
  dateContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  matchContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    flexDirection: "row", // Changed from previous version
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center", // Center items vertically
    flex: 2,
  },
  vsText: {
    fontSize: 16,
    textAlign: "center",
    color: "black",

  },
  matchText: {
    fontSize: 15,
    fontWeight: "500",
    color: "black",
  },

  statsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    justifyContent: "center",
  },
  
  statBox: {
    margin: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 1,
  },
  statTitle: {
    fontSize: 10,
    color: "#555",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});

export default MatchItem;
