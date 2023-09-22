export const calculateWins = (games, playerName) => {
  return games.filter((game) => game.winner === playerName).length;
};
