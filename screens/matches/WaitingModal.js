import { Modal, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";

export default function WaitingModal({ isVisible, onCancel }) {
  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.modalText}>Waiting for opponent to confirm...</Text>
          <TouchableOpacity onPress={onCancel}>
            <Text style={{ color: 'red' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginTop: 15,
    textAlign: "center",
  },
});