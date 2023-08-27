import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const LoadingOverlay = ({ visible }) => {
    return (
        <Modal transparent={true} visible={visible} >
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </Modal>
    );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});