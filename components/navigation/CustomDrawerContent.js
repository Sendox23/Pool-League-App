import { View, Button, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { signOutUser } from "../../util/firebase/firebaseAuth";

export default function CustomDrawerContent(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} style={styles.scrollView}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.signOutButtonContainer}>
        <Button title="Sign Out" onPress={signOutUser} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1, // This will ensure the scroll view takes up all available space except the button
  },
  signOutButtonContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
});