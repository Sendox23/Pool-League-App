import { useState, useEffect } from "react";
import {
  fetchAndFilterMatches,
  sortMatchesByDate,
} from "../../helpers/matches/matchHistoryHelpers";

export const useMatchData = (leagueType, userId, actualUserName) => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allFetchedMatches = await fetchAndFilterMatches(
          leagueType,
          userId,
          actualUserName
        );
        const sortedMatches = sortMatchesByDate(allFetchedMatches);
        setMatches(sortedMatches);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [leagueType, userId, actualUserName]);

  return { matches, isLoading, error };
};
