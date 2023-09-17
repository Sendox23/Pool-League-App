import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CheckBox from "expo-checkbox";
import Button from "../../ui/Button";
import FlatButton from "../../ui/FlatButton";
import { Colors } from "../../../constants/colors";

export default function GameEditControls({
  onEditGame,
  onCancel,
  breakAndRun,
  setBreakAndRun,
  toggleBreakAndRun,
  gameNumber,
  opponentFullName,
  userFullName,
}) {
  const handleSave = (winnerName) => {
    const editedData = {
      winner: winnerName,
      breakAndRun: breakAndRun,
    };
    onEditGame(editedData); // 'onEditGame' was passed down as a prop
  };
  return (
    <View style={styles.editControls}>
      <Text style={styles.editGameText}>Edit Game {gameNumber + 1}</Text>
      <View style={styles.playersRow}>
        <Button onPress={() => handleSave(userFullName)}>{userFullName}</Button>
        <Button onPress={() => handleSave(opponentFullName)}>
          {opponentFullName}
        </Button>
      </View>
      <View style={styles.actionsRow}>
        <View style={styles.breakAndRunContainer}>
          <CheckBox value={breakAndRun} onValueChange={toggleBreakAndRun} />
          <Text style={styles.checkBoxText}>Break & Run</Text>
        </View>
      </View>
      <FlatButton
        onPress={() => {
          onCancel(); // Call the onCancel function
          setBreakAndRun(false);
        }}
        style={styles.cancelButton}
      >
        <Ionicons name="md-close" size={16} color={"white"} />
      </FlatButton>
    </View>
  );
}

const styles = StyleSheet.create({
  editGameText: {
    fontSize: 16,
    color: Colors.secondary50,
    marginBottom: 10,
    textAlign: "center", // To center the text
    fontWeight: "bold", // Makes the text bold for emphasis
  },
  editControls: {
    padding: 10,
    backgroundColor: Colors.secondary300,
    borderRadius: 8,
    justifyContent: "space-between",
    position: "relative", // Added for positioning the cancelButton
  },
  playersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  breakAndRunContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center items horizontally
    alignItems: "center", // Center items vertically
    backgroundColor: Colors.secondary400,
    paddingVertical: 6, // Increased vertical padding for more vertical space
    paddingHorizontal: 10, // Increased horizontal padding for more space on the sides
    borderRadius: 4,
    borderColor: Colors.secondary100,
    borderWidth: 1,
    marginRight: 10,
    marginVertical: 5, // Added vertical margin for more spacing around
  },

  checkBoxText: {
    marginLeft: 8, // Slightly more space between checkbox and text
    color: Colors.secondary50,
    fontSize: 14, // Increased font size for clarity
    fontWeight: "500", // Made the text a bit bolder
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary400,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderColor: Colors.secondary100,
    borderWidth: 1,
    marginRight: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: Colors.secondary50,
    fontSize: 16,
  },
  cancelButton: {
    position: "absolute", // This will position the button absolutely within its parent
    top: 4, // 10 pixels from the top
    right: 4, // 10 pixels from the right
    backgroundColor: Colors.secondary400,
    padding: 2,
    borderRadius: 4,
    borderColor: Colors.secondary100,
    borderWidth: 1,
  },
});
