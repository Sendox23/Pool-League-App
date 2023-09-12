import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

export default function GameRow({
  index,
  userCtx,
  game,
  onEdit,
  onDelete,
  isEditMode,
}) {
  return (
    <View key={game.id} style={styles.row}>
      <Text style={styles.cell}>
        {`Game ${index + 1}:`}
        {game.winner === "player1" ? ` ${userCtx.firstName} ${userCtx.lastName}` : " Player 2"}
        {game.breakAndRun ? " \n(Break & Run)" : ""}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
          <FontAwesome5 name="edit" size={12} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.iconButton, isEditMode ? styles.disabledButton : {}]} // Add styles for the disabled state
          disabled={isEditMode} // Disable button when in edit mode
        >
          <FontAwesome5
            name="trash-alt"
            size={12}
            color={isEditMode ? "grey" : "black"}
          />
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
    color: Colors.secondary50,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
  },
  disabledButton: {
    // Styles for the disabled state
    opacity: 0.5,
  },
});
