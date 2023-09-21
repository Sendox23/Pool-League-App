import { useContext } from "react";
import { Platform, View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

import Button from "../../ui/Button";
import LoadingSpinner from "../../ui/LoadingSpinner";

import { AuthContext } from "../../../store/context/AuthContext";
import { Colors } from "../../../constants/colors";

export default function PlayerPicker({
  players,
  selectedPlayerUid,
  onPlayerChange,
  onStartGame,
  isLoading,
}) {
  const userCtx = useContext(AuthContext);

  const getSelectedPlayerName = () => {
    const selectedPlayer = players.find(
      (player) => player.uid === selectedPlayerUid
    );
    return selectedPlayer
      ? `${selectedPlayer.firstName} ${selectedPlayer.lastName}`
      : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Who are you playing against?</Text>

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedPlayerUid || "default"}
          onValueChange={onPlayerChange}
          mode="dropdown"
        >
          <Picker.Item key="default" label="Select Player" value={null} />
          {players.map((player) => (
            <Picker.Item
              key={player.uid}
              label={`${player.firstName} ${player.lastName}`}
              value={player.uid}
            />
          ))}
        </Picker>
      </View>

      {selectedPlayerUid && (
        <>
          <Text style={styles.selectedPlayerText}>
            {userCtx.firstName} {userCtx.lastName}
          </Text>
          <Text style={styles.vsText}>vs.</Text>
          <Text style={styles.selectedPlayerText}>
            {getSelectedPlayerName()}
          </Text>
        </>
      )}

      {selectedPlayerUid && (
        <Button
          onPress={onStartGame}
          style={{ button: styles.button, buttonText: styles.buttonText }}
        >
          {isLoading ? <LoadingSpinner /> : "Start Game"}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 24, // Increase font size for prominence
    color: Colors.secondary50,
    fontWeight: "bold",
    marginBottom: 30, // Adjust margin for spacing
  },
  pickerContainer: {
    ...Platform.select({
      ios: {
        borderColor: Colors.primary400,
        borderWidth: 1,
        borderRadius: 12, // rounded corners for iOS
      },
      android: {
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.primary400,
        borderWidth: 1,
        borderRadius: 4,
      },
    }),
    backgroundColor: Colors.secondary100,
    overflow: "hidden",
    width: 220,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  picker: {
    ...Platform.select({
      ios: {
        height: 180,
        color: "#000", // text color for iOS
      },
      android: {
        height: 40,
        color: "#000", // text color for Android
      },
    }),
    width: "100%",
  },

  selectedPlayerText: {
    ...Platform.select({
      android: {
        marginTop: 10, // Uniform margin
        fontSize: 28, // Increase font size
        fontWeight: "500", // Semi-bold
      },
    }),
    fontSize: 28, // Increase font size
    color: Colors.secondary50,
    fontWeight: "500", // Semi-bold
  },
  vsText: {
    ...Platform.select({
      ios: { margin: 10 },
      android: {
        marginTop: 30,
        marginBottom: 20,
      },
    }),
    fontSize: 24,
    color: Colors.secondary200,
  },
  button: {
    borderRadius: 8,
    marginTop: 70,
    alignItems: "center",
    height: 50,
    backgroundColor: Colors.secondary600,
    borderColor: Colors.secondary50,
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.secondary50,
    fontSize: 18,
    fontWeight: "500",
  },
});
