import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../../../constants/colors";


export default function PlayersHeader({userCtx, leagueType, player1Games, player2Games}) {


  return (
    <>
      <View>
        <Text style={styles.leagueTypeText}>{leagueType}</Text>
      </View>
      <View style={styles.playerNamesContainer}>
        <View style={styles.playerContainer}>
          <Text style={styles.playerNamesText}>{userCtx.firstName} {userCtx.lastName}</Text>
          <Text style={styles.playerWinsText}>{player1Games.length}</Text>
        </View>
        <View style={styles.playerContainer}>
          <Text style={styles.playerNamesText}>Player 2</Text>
          <Text style={styles.playerWinsText}> {player2Games.length}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    leagueTypeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.secondary50,
        alignSelf: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginBottom: 10,
    },
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
        marginHorizontal: 50,
      },
      playerWinsText: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.secondary50,
        alignSelf: "center",
        justifyContent: "center",
        marginHorizontal: 10,
      },
})