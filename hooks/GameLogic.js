import { useGame } from "../store/context/GameContext";

export function useGameLogic() {
  const [state, dispatch] = useGame(); // <-- Use the hook

  const { games, player1Games, player2Games, breakAndRun, selectedGame } =
    state;

  const isMaxGamesReached =
    player1Games.length >= 7 || player2Games.length >= 7;

  const addGame = (player) => {
    if (isMaxGamesReached) {
      alert("A player has already reached 7 wins. No more games can be added.");
      return;
    }
    dispatch({
      type: "ADD_GAME",
      payload: {
        winner: player,
        breakAndRun: breakAndRun,
      },
    });
  };

  return {
    games,
    player1Games,
    player2Games,
    breakAndRun,
    selectedGame,
    addGame,
    setSelectedGame: (game) => {
      dispatch({
        type: "SET_SELECTED_GAME",
        payload: game,
      });
    },
    toggleBreakAndRun: () => {
      dispatch({
        type: "TOGGLE_BREAK_AND_RUN",
        payload: { breakAndRun: !breakAndRun },
      });
    },
    editGame: (gameId, newWinner) => {
      dispatch({
        type: "EDIT_GAME",
        payload: { gameId, newWinner, breakAndRun },
      });
    },
    deleteGame: (gameId) => {
      dispatch({
        type: "DELETE_GAME",
        payload: { gameId },
      });
    },
  };
}
