import { View, StyleSheet } from "react-native";
import GamesTable from "../../components/matches/games/GamesTable";
import { GameProvider } from "../../store/context/GameContext";

export default function CurrentMatchScreen({ leagueType }) {


  return (
    <View style={styles.screen}>
      <GameProvider>
        <GamesTable leagueType={leagueType}/>
      </GameProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
