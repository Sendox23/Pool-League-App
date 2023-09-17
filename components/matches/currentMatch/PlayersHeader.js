import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../../../constants/colors";

export default function PlayersHeader({
  userCtx,
  opponentFirstName,
  opponentLastName,

  userWins,
  opponentWins
}) {
  
  return (
    <>
      <View style={styles.playerNamesContainer}>
        <View style={styles.playerContainer}>
          <Text style={styles.playerNamesText}>
            {userCtx.firstName} {userCtx.lastName}
          </Text>
          <Text style={styles.playerWinsText}>{userWins}</Text>
        </View>
        <View style={styles.playerContainer}>
          <Text style={styles.playerNamesText}>
            {opponentFirstName} {opponentLastName}
          </Text>
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
  },
  playerNamesText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.secondary50,
  },
  playerWinsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary50,
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
