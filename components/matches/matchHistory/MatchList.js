import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import MatchItem from "./MatchItem";
import LoadingOverlay from "../../ui/LoadingOverlay";
import ErrorComponent from "../../ui/ErrorComponent";

const MatchList = ({ matches, isLoading, error }) => {
  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return matches.length > 0 ? (
    <FlatList
      style={styles.list}
      data={matches}
      keyExtractor={(item) => `${item.matchId}${item.date}${item.time}`} // Updated keyExtractor
      renderItem={({ item }) => <MatchItem match={item} />}
    />
  ) : (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No matches found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    marginBottom: 10,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});

export default MatchList;
