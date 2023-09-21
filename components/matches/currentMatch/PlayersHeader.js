import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../../../constants/colors";

export default function PlayersHeader({
  userCtx,
  opponentName,
  userWins,
  opponentWins,
}) {
  const [opponentFirstName, opponentLastName] = opponentName.split(" ");

  return (
    <>
      <View style={styles.playerNamesContainer}>
        <View style={styles.playerContainer}>
          <Text style={styles.playerNamesText}>{userCtx.firstName}</Text>
          <Text style={styles.playerNamesText}>{userCtx.lastName}</Text>
          <Text style={styles.playerWinsText}>{userWins}</Text>
        </View>
        <Text style={styles.versusText}>Vs.</Text>
        <View style={styles.playerContainer}>
          <Text style={styles.playerNamesText}>{opponentFirstName}</Text>
          <Text style={styles.playerNamesText}>{opponentLastName}</Text>
          <Text style={styles.playerWinsText}>{opponentWins}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  playerNamesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  playerContainer: {
    flexDirection: "column",
    flex: 3, // 3 parts of the available space
  },
  playerNamesText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.secondary50,
    textAlign: "center",
  },
  playerWinsText: {
    fontSize: 32,
    color: Colors.secondary50,
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  versusText: {
    fontSize: 22,
    color: Colors.secondary50,
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    flex: 1, // 1 part of the available space
  },
});
