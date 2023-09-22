import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlayerPicker from "../../components/matches/scheduleMatch/PlayerPicker";
import WaitingModal from "./WaitingModal";
import ErrorComponent from "../../components/ui/ErrorComponent";
import { Colors } from "../../constants/colors";
import { useScheduleMatch } from '../../hooks/matches/useScheduleMatch';

export default function ScheduleMatchScreen({ navigation, route }) {
  const leagueType = route.params?.leagueType;
  const {
    players,
    selectedPlayerUid,
    setSelectedPlayerUid,
    isLoading,
    error,
    isModalVisible,
    startGameHandler,
    cancelMatch,
  } = useScheduleMatch(leagueType, navigation);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <View style={styles.screen}>
      <WaitingModal isVisible={isModalVisible} onCancel={cancelMatch} />
      <PlayerPicker
        players={players}
        selectedPlayerUid={selectedPlayerUid}
        onPlayerChange={setSelectedPlayerUid}
        onStartGame={startGameHandler}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.secondary400,
    flex: 1,
    alignItems: 'center',
  },
});