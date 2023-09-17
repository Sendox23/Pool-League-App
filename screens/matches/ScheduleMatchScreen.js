import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../store/context/AuthContext";
import {
  fetchLeagues,
  fetchBrackets,
  addMatch,
} from "../../util/firebase/firebaseDb"; // Import the new functions
import { Colors } from "../../constants/colors";
import PlayerPicker from "../../components/matches/scheduleMatch/PlayerPicker";

export default function ScheduleMatchScreen({ navigation, route }) {
  const userCtx = useContext(AuthContext);

  const [players, setPlayers] = useState([]);
  const [selectedPlayerUid, setSelectedPlayerUid] = useState(null);
  const [bracket, setBracket] = useState(null);
  const leagueType = route.params?.leagueType;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const leagues = await fetchLeagues();

        if (leagues && leagues.length > 0) {
          const league = leagues.find((l) => l.leagueName === leagueType); // Find the specific league

          if (league) {
            const brackets = fetchBrackets(league, userCtx.user.uid);

            setBracket(brackets[0]?.bracketId);

            const allPlayers = brackets.flatMap((bracket) => {
              return bracket.players
                ? Object.keys(bracket.players)
                    .filter((uid) => uid !== userCtx.user.uid)
                    .map((uid) => ({ uid, ...bracket.players[uid] }))
                : [];
            });

            setPlayers(allPlayers);
          }
        }
      } catch (err) {

        setError(err.message);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [leagueType]);

  const startGameHandler = async () => {
    const opponent = players.find((p) => p.uid === selectedPlayerUid);
    if (!opponent) return;
  
    const opponentName = `${opponent.firstName} ${opponent.lastName}`;
    const userName = `${userCtx.firstName} ${userCtx.lastName}`;
    
    const matchId = await addMatch(userName, opponentName, leagueType, bracket); // Get the match ID returned
  
    navigation.navigate("CurrentMatch", {
      opponentUid: opponent.uid,
      opponentFirstName: opponent.firstName,
      opponentLastName: opponent.lastName,
      leagueType: leagueType,
      bracket: bracket,
      opponentName: opponentName,
      userName: userName,
      matchId: matchId,  // Pass the match ID to the next screen
    });
  };

  return (
    <View style={styles.screen}>
      <PlayerPicker
        players={players}
        selectedPlayerUid={selectedPlayerUid}
        onPlayerChange={setSelectedPlayerUid}
        onStartGame={startGameHandler}
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
