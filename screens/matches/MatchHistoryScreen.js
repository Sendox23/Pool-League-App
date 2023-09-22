import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../store/context/AuthContext";
import { useMatchData } from "../../hooks/matches/useMatchData";

import MatchList from "../../components/matches/matchHistory/MatchList";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import StatsHeader from "../../components/matches/matchHistory/StatsHeader";
import ErrorComponent from "../../components/ui/ErrorComponent";

import { Colors } from "../../constants/colors";

export default function MatchHistoryScreen({ route }) {
  const leagueType = route.params?.leagueType;
  const userCtx = useContext(AuthContext);
  const actualUserName = `${userCtx.firstName} ${userCtx.lastName}`;

  const { matches, isLoading, error } = useMatchData(
    leagueType,
    userCtx.user.uid,
    actualUserName
  );

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <View style={styles.screen}>
      <StatsHeader matches={matches} />
      <MatchList matches={matches} isLoading={isLoading} error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.secondary400,
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
});
