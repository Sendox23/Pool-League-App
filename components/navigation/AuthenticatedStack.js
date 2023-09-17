import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import LeaguesScreen from "../../screens/leagues/LeaguesScreen";
import UserProfileScreen from "../../screens/userProfile/UserProfileScreen";
import { MatchesStack } from "./MatchesStack";
import CustomDrawerContent from "./CustomDrawerContent";
import { Colors } from "../../constants/colors";

const AuthenticatedStack = createDrawerNavigator();

export default function AuthenticatedStackScreen() {
  return (
    <AuthenticatedStack.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      <AuthenticatedStack.Screen name="Leagues" component={LeaguesScreen} />
      <AuthenticatedStack.Screen name="Matches" component={MatchesStack} />
      <AuthenticatedStack.Screen name="Eight Ball" component={MatchesStack} />
      <AuthenticatedStack.Screen name="Nine Ball" component={MatchesStack} />
      <AuthenticatedStack.Screen name="Ten Ball" component={MatchesStack} />
      <AuthenticatedStack.Screen name="Profile" component={UserProfileScreen} />
    </AuthenticatedStack.Navigator>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary900,
  },
  headerTitle: {
    color: "white",
  },
});
