import { useState } from "react";
import { View, StyleSheet } from "react-native";

import Button from "../../components/ui/Button";
import LeagueImage from "../../components/ui/LeagueImage";
import WinnerText from "../../components/matches/matchResults/WinnerText";
import ScoreContainer from "../../components/matches/matchResults/ScoreContainer";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

import { Colors } from "../../constants/colors";

export default function MatchResultsScreen({ navigation, route }) {
  
  const [isLoading, setIsLoading] = useState(false);

  const {
    winner,
    userFullName,
    opponentName,
    userWins,
    userBreakAndRuns,
    opponentWins,
    opponentBreakAndRuns,
    leagueType,
  } = route.params;

  const handleReturnHome = () => {
    setIsLoading(true);
    navigation.reset({
      index: 0,
      routes: [{ name: "Leagues" }],
    });
  };

  return (
    <View style={styles.container}>
      <WinnerText winner={winner} userFullName={userFullName} />
      <LeagueImage leagueType={leagueType} height={120} width={130} />
      <ScoreContainer
        userFullName={userFullName}
        opponentName={opponentName}
        userWins={userWins}
        userBreakAndRuns={userBreakAndRuns}
        opponentWins={opponentWins}
        opponentBreakAndRuns={opponentBreakAndRuns}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Button
          style={{ container: styles.customButtonContainer }}
          textStyle={styles.buttonText}
          onPress={handleReturnHome}
        >
          Return Home
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary50,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  customButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
