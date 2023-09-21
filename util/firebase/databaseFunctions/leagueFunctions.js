import { fetchData, buildRef } from "./firebase-utils";

// Fetch all leagues from Firebase
export const fetchLeagues = async () => {
  const leaguesData = await fetchData(buildRef("leagues"));
  return leaguesData
    ? Object.keys(leaguesData).map((leagueName) => ({
        leagueName,
        ...leaguesData[leagueName],
      }))
    : null;
};

// Fetch the brackets for a league that the user is in
export const fetchBrackets =  (league, userUid) =>
  Object.keys(league.brackets || {})
    .map((bracketId) => {
      const bracket = league.brackets[bracketId];
      return bracket.players && userUid in bracket.players
        ? { bracketId, ...bracket }
        : null;
    })
    .filter(Boolean);

// Check if a user is in a given league
export const isUserInLeague = async (userUid, leagueType) => {
  const bracketsData = await fetchData(
    buildRef(`leagues/${leagueType}/brackets`)
  );
  return bracketsData
    ? Object.values(bracketsData).some(
        (bracket) => bracket.players && userUid in bracket.players
      )
    : false;
};
