import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../store/context/AuthContext";
import {
  fetchLeagues,
  fetchBrackets,
} from "../../util/firebase/databaseFunctions/leagueFunctions";
import {
  addMatch,
  deleteMatch,
  fetchFinishedMatchesBetweenTwoPlayers,
  subscribeToMatchStatus,
} from "../../util/firebase/databaseFunctions/matchFunctions";

import PlayerPicker from "../../components/matches/scheduleMatch/PlayerPicker";
import WaitingModal from "./WaitingModal";
import ErrorComponent from "../../components/ui/ErrorComponent";

import { Colors } from "../../constants/colors";

export default function ScheduleMatchScreen({ navigation, route }) {
  const userCtx = useContext(AuthContext);
  const userName = `${userCtx.firstName} ${userCtx.lastName}`;
  const leagueType = route.params?.leagueType;

  const [players, setPlayers] = useState([]);
  const [selectedPlayerUid, setSelectedPlayerUid] = useState(null);
  const [bracket, setBracket] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [matchId, setMatchId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let unsubscribe;

  const cancelMatch = async () => {
    if (unsubscribe) {
      unsubscribe();
    }
    if (matchId) {
      await deleteMatch(leagueType, bracket, matchId);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const leagues = await fetchLeagues();
        const userName = `${userCtx.firstName} ${userCtx.lastName}`;

        if (leagues && leagues.length > 0) {
          const league = leagues.find((l) => l.leagueName === leagueType);

          if (league) {
            const brackets = fetchBrackets(league, userCtx.user.uid);

            if (brackets && brackets.length > 0) {
              setBracket(brackets[0]?.bracketId);

              const allPlayers = brackets.flatMap((bracket) => {
                return bracket.players
                  ? Object.keys(bracket.players)
                      .filter((uid) => uid !== userCtx.user.uid)
                      .map((uid) => ({ uid, ...bracket.players[uid] }))
                  : [];
              });

              const filteredPlayers = [];
              for (const opponent of allPlayers) {
                const opponentName = `${opponent.firstName} ${opponent.lastName}`;
                const finishedMatches =
                  await fetchFinishedMatchesBetweenTwoPlayers(
                    userName,
                    opponentName,
                    leagueType,
                    brackets[0]?.bracketId
                  );

                if (finishedMatches.length === 0) {
                  filteredPlayers.push(opponent);
                }
              }

              setPlayers(filteredPlayers);
            }
          }
        }
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [leagueType, userCtx.user]);

  const startGameHandler = async () => {
    setIsLoading(true);
    setIsModalVisible(true);

    const opponent = players.find((p) => p.uid === selectedPlayerUid);
    if (!opponent) {
      setIsCreatingMatch(false);
      return;
    }
    const opponentName = `${opponent.firstName} ${opponent.lastName}`;
    const matchId = await addMatch(
      userName,
      opponentName,
      leagueType,
      bracket
    );
    setMatchId(matchId); // Set matchId here
    unsubscribe = subscribeToMatchStatus(
      leagueType,
      bracket,
      matchId,
      (matchDetails) => {
        if (
          matchDetails &&
          matchDetails.confirmedStart &&
          matchDetails.confirmedStart.length === 2
        ) {
          navigation.navigate("CurrentMatch", {
            opponentUid: opponent.uid,
            leagueType: leagueType,
            bracket: bracket,
            opponentName: opponentName,
            userName: userName,
            matchId: matchId,
          });
          setIsModalVisible(false);
          unsubscribe(); // Unsubscribe from updates after navigating
        }
      }
    );
    setIsLoading(false);
  };

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
    alignItems: "center",
  },
});
