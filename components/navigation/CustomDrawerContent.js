import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { signOutUser } from "../../util/firebase/firebaseAuth";

import { Colors } from "../../constants/colors";

export default function CustomDrawerContent(props) {
  const { navigation, state } = props;
  
  const isRouteActive = (routeName) => state.routes[state.index].name === routeName;

  return (
    <View style={styles.container}>
      <DrawerContentScrollView style={styles.scrollView} {...props}>
        <View style={styles.profileContainer}>
          <Image
                   source={require("../../assets/images/placeholderImage.png")}
            style={styles.profileImage}
          />
        </View>
        <TouchableOpacity style={[styles.item, isRouteActive('Leagues') && styles.activeItem]} onPress={() => navigation.navigate('Leagues')}>
          <Text style={styles.itemLabel}>Leagues</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item, isRouteActive('Profile') && styles.activeItem]} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.itemLabel}>Profile</Text>
        </TouchableOpacity>
        {/* Add other buttons as needed */}
      </DrawerContentScrollView>
      <View style={styles.signOutButtonContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={signOutUser}>
          <Text style={styles.signOutLabel}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1, 
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomColor: Colors.secondary300,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,  // This will make the image circular
    backgroundColor: Colors.secondary100,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeItem: {
    backgroundColor: '#e0e0e0', // You can change this to your preferred color
  },
  itemLabel: {
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 16,
  },
  signOutButtonContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  signOutButton: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#2c43aa',
    borderRadius: 4,
  },
  signOutLabel: {
    fontSize: 16,
    color: 'white',
  },
});