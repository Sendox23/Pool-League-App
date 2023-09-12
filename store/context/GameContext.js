import React, { createContext, useReducer, useContext } from "react";

const GameContext = createContext();

const gameReducer = (state, action) => {
  const { winner, breakAndRun, gameId, newWinner } = action.payload || {};
  switch (action.type) {
    case "ADD_GAME":
      const newGame = {
        id: Date.now(),
        winner: winner,
        breakAndRun: breakAndRun,
      };
      return {
        ...state,
        games: [...state.games, newGame],
        [winner + "Games"]: [...state[winner + "Games"], newGame],
        breakAndRun: false,
      };

      case "EDIT_GAME": {
        const updatedGames = state.games.map((game) => {
          if (game.id === action.payload.gameId) {
            return {
              ...game,
              winner: action.payload.newWinner,
              breakAndRun: action.payload.breakAndRun
            };
          }
          return game;
        });
      
        return {
          ...state,
          games: updatedGames,
        player1Games: updatedGames.filter((game) => game.winner === "player1"),
        player2Games: updatedGames.filter((game) => game.winner === "player2"),
      };
    }

    case "TOGGLE_BREAK_AND_RUN": 
    return {
      ...state,
      breakAndRun: action.payload.breakAndRun
    };

    case "SET_SELECTED_GAME":
      return {
        ...state,
        selectedGame: action.payload, // assuming you're passing the selected game as a payload
      };

    case "DELETE_GAME":
      return {
        ...state,
        games: state.games.filter((game) => game.id !== action.payload.gameId),
        player1Games: state.player1Games.filter(
          (game) => game.id !== action.payload.gameId
        ),
        player2Games: state.player2Games.filter(
          (game) => game.id !== action.payload.gameId
        ),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const initialState = {
  games: [],
  player1Games: [],
  player2Games: [],
  breakAndRun: false,
  selectedGame: null,
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={[state, dispatch]}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
