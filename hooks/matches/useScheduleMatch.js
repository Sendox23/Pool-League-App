import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../store/context/AuthContext";
import {
  addMatch,
  deleteMatch,
  subscribeToMatchStatus
} from "../../util/firebase/databaseFunctions/matchFunctions";
import { fetchData } from '../../helpers/matches/scheduleMatchHelpers';

export const useScheduleMatch = (leagueType, navigation) => {
  const userCtx = useContext(AuthContext);
  const userName = `${userCtx.firstName} ${userCtx.lastName}`;
  
  const [state, setState] = useState({
    players: [],
    selectedPlayerUid: null,
    bracket: null,
    isModalVisible: false,
    matchId: null,
    isLoading: false,
    error: null,
    unsubscribe: null
  });

  useEffect(() => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    fetchData(setState, leagueType, userCtx.user, userName);
    setState(prevState => ({ ...prevState, isLoading: false }));
  }, [leagueType, userCtx.user]);

  const startGameHandler = async () => {
    setState(prevState => ({ ...prevState, isLoading: true, isModalVisible: true }));
    const opponent = state.players.find((p) => p.uid === state.selectedPlayerUid);
    if (!opponent) {
      setState(prevState => ({ ...prevState, isLoading: false }));
      return;
    }
    const opponentName = `${opponent.firstName} ${opponent.lastName}`;
    const newMatchId = await addMatch(
      userName,
      opponentName,
      leagueType,
      state.bracket
    );
    const unsubscribe = subscribeToMatchStatus(
      leagueType,
      state.bracket,
      newMatchId,
      (matchDetails) => {
        if (
          matchDetails &&
          matchDetails.confirmedStart &&
          matchDetails.confirmedStart.length === 2
        ) {
          navigation.navigate("CurrentMatch", {
            opponentUid: opponent.uid,
            leagueType,
            bracket: state.bracket,
            opponentName,
            userName,
            matchId: newMatchId,
          });
          setState(prevState => ({ ...prevState, isModalVisible: false, unsubscribe: null }));
          unsubscribe();
        }
      }
    );
    setState(prevState => ({ ...prevState, isLoading: false, matchId: newMatchId, unsubscribe }));
  };

  const cancelMatch = async () => {
    if (state.unsubscribe) state.unsubscribe();
    if (state.matchId) await deleteMatch(leagueType, state.bracket, state.matchId);
    setState(prevState => ({ ...prevState, isModalVisible: false }));
  };

  return {
    ...state,
    startGameHandler,
    cancelMatch,
    setSelectedPlayerUid: (uid) => setState(prevState => ({ ...prevState, selectedPlayerUid: uid }))
  };
};