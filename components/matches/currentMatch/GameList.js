import React, { useEffect, useRef } from "react";
import { StyleSheet, ScrollView } from "react-native";
import GameRow from "./GameRow";

import { Colors } from "../../../constants/colors";

export default function GameList({
  games,
  onEditGame,
  onDeleteGame,
  userFullName,
  opponentFirstName,
  opponentLastName,
  userCtx,
}) {
  const scrollViewRef = useRef(null);
  useEffect(() => {
    if (games) {
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    }
  }, [games]);
  return (
    <ScrollView style={styles.table} ref={scrollViewRef}>
      {games &&
        Array.isArray(games) &&
        games.map((game, index) => (
          <GameRow
            key={game.id}
            index={index}
            userCtx={userCtx}
            opponentFirstName={opponentFirstName}
            opponentLastName={opponentLastName}
            game={game}
            onEditGame={() => onEditGame(game)}
            onDeleteGame={onDeleteGame}
            userFullName={userFullName}
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: Colors.secondary100,
    borderRadius: 8,
    backgroundColor: Colors.primary400,
    maxHeight: 300,
    shadowColor: Colors.primary600,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});
