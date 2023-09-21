import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

export default function GameRow({
  index,
  userCtx,
  game,
  onEditGame,
  isEditing,
  onDeleteGame,
  opponentName,
  userFullName,
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>
        {`Game ${index + 1}:`}
        {game.winner === userFullName
          ? ` ${userCtx.firstName} ${userCtx.lastName}`
          : ` ${opponentName}`}
        {game.breakAndRun ? " \n(Break & Run)" : ""}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            onEditGame(game); // Add this line to call onEditGame when the edit button is pressed
          }}
          style={[styles.iconButton, isEditing && styles.iconButtonDisabled]}
          disabled={isEditing}
        >
          <FontAwesome5 name="edit" size={12} color={Colors.primary600} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDeleteGame(game.id)}
          style={[styles.iconButton, isEditing && styles.iconButtonDisabled]}
          disabled={isEditing}
        >
          <FontAwesome5 name="trash" size={12} color={Colors.error500} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Colors.secondary200,
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.secondary100,
    backgroundColor: "white",
  },
  iconButtonDisabled: {
    // Styles for the disabled state
    opacity: 0.5,
    backgroundColor: Colors.secondary50,
  },
});
