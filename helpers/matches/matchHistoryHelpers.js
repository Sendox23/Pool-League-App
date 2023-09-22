import {
  fetchBrackets,
  fetchLeagues,
} from "../../util/firebase/databaseFunctions/leagueFunctions";
import { fetchMatchesForBracket } from "../../util/firebase/databaseFunctions/matchFunctions";

export const fetchAndFilterMatches = async (
  leagueType,
  userId,
  actualUserName
) => {
  const leagues = await fetchLeagues();
  const league = leagues.find((l) => l.leagueName === leagueType);
  const allFetchedMatches = [];

  if (league) {
    const fetchedBrackets = await fetchBrackets(league, userId);

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

      allFetchedMatches.push(
        ...formatMatches(userRelatedMatches, actualUserName)
      );
    }
  }

  return allFetchedMatches;
};

const formatMatches = (matches, actualUserName) => {
  return matches.map((match) => {
    const players = Object.keys(match).filter(
      (key) => key !== "date" && key !== "status" && key !== "winner"
    );
    const user = players.find((name) => name === actualUserName);
    const opponent = players.find((name) => name !== actualUserName);

    const userWins = match[user]?.wins || 0;
    const userBreakAndRuns = match[user]?.breakAndRuns || 0;
    const opponentWins = match[opponent]?.wins || 0;
    const opponentBreakAndRuns = match[opponent]?.breakAndRuns || 0;

    return {
      matchId: `${user} Vs ${opponent}`,
      user,
      opponent,
      userWins,
      userBreakAndRuns,
      opponentWins,
      opponentBreakAndRuns,
      ...match,
    };
  });
};

export const sortMatchesByDate = (matches) => {
  return matches.sort((a, b) => {
    const aDate = new Date(
      `${a.date.split("/").reverse().join("-")} ${a.time}`
    );
    const bDate = new Date(
      `${b.date.split("/").reverse().join("-")} ${b.time}`
    );
    return bDate - aDate;
  });
};
