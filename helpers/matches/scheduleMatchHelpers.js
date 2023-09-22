import {
  fetchLeagues,
  fetchBrackets,
} from "../../util/firebase/databaseFunctions/leagueFunctions";
import { fetchFinishedMatchesBetweenTwoPlayers } from "../../util/firebase/databaseFunctions/matchFunctions";

export const fetchData = async (setState, leagueType, user, userName) => {
  try {
    const leagues = await fetchLeagues();
    if (leagues && leagues.length > 0) {
      const league = leagues.find((l) => l.leagueName === leagueType);
      if (league) {
        const brackets = await fetchBrackets(league, user.uid);
        if (brackets && brackets.length > 0) {
          setState((prevState) => ({
            ...prevState,
            bracket: brackets[0]?.bracketId,
          }));
          const filteredPlayers = await getFilteredPlayers(
            brackets,
            user.uid,
            userName,
            leagueType
          );
          setState((prevState) => ({ ...prevState, players: filteredPlayers }));
        }
      }
    }
  } catch (err) {
    setState((prevState) => ({ ...prevState, error: err.message }));
  }
};

const getFilteredPlayers = async (brackets, userId, userName, leagueType) => {
  const allPlayers = brackets.flatMap((bracket) =>
    bracket.players
      ? Object.keys(bracket.players)
          .filter((uid) => uid !== userId)
          .map((uid) => ({ uid, ...bracket.players[uid] }))
      : []
  );
  const filteredPlayers = [];
  for (const opponent of allPlayers) {
    const opponentName = `${opponent.firstName} ${opponent.lastName}`;
    const finishedMatches = await fetchFinishedMatchesBetweenTwoPlayers(
      userName,
      opponentName,
      leagueType,
      brackets[0]?.bracketId
    );
    if (finishedMatches.length === 0) {
      filteredPlayers.push(opponent);
    }
  }
  return filteredPlayers;
};
