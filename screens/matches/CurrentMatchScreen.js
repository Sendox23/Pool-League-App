import { View, StyleSheet, Alert } from "react-native";

import Games from "../../components/matches/currentMatch/Games";
import Header from "../../components/matches/scheduleMatch/Header";
import Button from "../../components/ui/Button";
import { Colors } from "../../constants/colors";

export default function CurrentMatchScreen({ route, navigation }) {
  const leagueType = route.params?.leagueType;
  const opponentUid = route.params?.opponentUid;
  const userName = route.params?.userName;
  const opponentName = route.params?.opponentName;
  const bracket = route.params?.bracket;
  const matchId = route.params?.matchId;

  const exitMatch = () => {
    Alert.alert(
      "Exit Confirmation",
      "Exiting the match won't end it — You can always join back in just like you did before.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Leagues" }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.screen}>
      <Header title={`${leagueType} Match`} />
      <Games
        navigation={navigation}
        leagueType={leagueType}
        opponentUid={opponentUid}
        bracket={bracket}
        opponentName={opponentName}
        userName={userName}
        matchId={matchId}
      />
      <Button
        style={{
          button: { backgroundColor: Colors.error400 },
          buttonText: { color: "white" },
        }}
        onPress={exitMatch}
      >
        Exit Match
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primary600,
    flex: 1,
    padding: 20,
  },
});
