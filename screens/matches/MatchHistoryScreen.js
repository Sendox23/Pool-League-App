import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { AuthContext } from "../../store/context/AuthContext";
import {
  fetchBrackets,
  fetchLeagues,
} from "../../util/firebase/databaseFunctions/leagueFunctions";
import { fetchMatchesForBracket } from "../../util/firebase/databaseFunctions/matchFunctions";
import MatchList from "../../components/matches/matchHistory/MatchList";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { Colors } from "../../constants/colors";
import StatsHeader from "../../components/matches/matchHistory/StatsHeader";
import ErrorComponent from "../../components/ui/ErrorComponent";

export default function MatchHistoryScreen({ route }) {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const leagueType = route.params?.leagueType;
  const userCtx = useContext(AuthContext);
  const actualUserName = `${userCtx.firstName} ${userCtx.lastName}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const leagues = await fetchLeagues();
        const league = leagues.find((l) => l.leagueName === leagueType);
        if (league) {
          const fetchedBrackets = await fetchBrackets(league, userCtx.user.uid);
          const allFetchedMatches = [];
          for (const bracket of fetchedBrackets) {
            const fetchedMatches = await fetchMatchesForBracket(
              leagueType,
              bracket.bracketId
            );

            const userRelatedMatches = fetchedMatches.filter((match) => {
              const players = Object.keys(match).filter(
                (key) => key !== "date" && key !== "status" && key !== "winner"
              );
              return players.includes(actualUserName);
            });

            userRelatedMatches.forEach((match, index) => {
              const players = Object.keys(match).filter(
                (key) => key !== "date" && key !== "status" && key !== "winner"
              );
              const user = players.find((name) => name === actualUserName);
              const opponent = players.find((name) => name !== actualUserName);
              
              const userWins = match[user]?.wins || 0;
              const userBreakAndRuns = match[user]?.breakAndRuns || 0;
              const opponentWins = match[opponent]?.wins || 0;
              const opponentBreakAndRuns = match[opponent]?.breakAndRuns || 0;

              allFetchedMatches.push({
                matchId: `${user} Vs ${opponent}`,
                user,
                opponent,
                userWins,
                userBreakAndRuns,
                opponentWins,
                opponentBreakAndRuns,
                ...match,
              });
            });
          }
          
          const sortedMatches = allFetchedMatches.sort((a, b) => {
            const aDate = new Date(`${a.date.split("/").reverse().join("-")} ${a.time}`);
            const bDate = new Date(`${b.date.split("/").reverse().join("-")} ${b.time}`);
            return bDate - aDate;
          });
          
          setMatches(sortedMatches);
        }
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [leagueType, userCtx.user, actualUserName]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorComponent error={error}/>
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


