import { View, StyleSheet } from "react-native";
import GamesTable from "../../components/matches/currentMatch/GamesTable";
import Header from "../../components/matches/scheduleMatch/Header";

import { Colors } from "../../constants/colors";

export default function CurrentMatchScreen({ route, navigation }) {
  const leagueType = route.params?.leagueType;
  const opponentUid = route.params?.opponentUid;
  const opponentFirstName = route.params?.opponentFirstName;
  const opponentLastName = route.params?.opponentLastName;
  const userName = route.params?.userName;
  const opponentName = route.params?.opponentName;
  const bracket = route.params?.bracket;
  const matchId = route.params?.matchId;
  
  return (
    <View style={styles.screen}>
      <Header title={`${leagueType} Match`} />
      <GamesTable
        leagueType={leagueType}
        opponentUid={opponentUid}
        opponentFirstName={opponentFirstName}
        opponentLastName={opponentLastName}
        bracket={bracket}
        opponentName={opponentName}
        userName={userName}
        matchId={matchId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.secondary500,
    flex: 1,
    padding: 20,
  },
});
