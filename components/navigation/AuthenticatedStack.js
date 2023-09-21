import React from "react";
import { StyleSheet, Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LeaguesScreen from "../../screens/leagues/LeaguesScreen";
import UserProfileScreen from "../../screens/userProfile/UserProfileScreen";
import MatchResultsScreen from "../../screens/matches/MatchResultsScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import { MatchesStack } from "./MatchesStack";
import { Colors } from "../../constants/colors";

const AuthenticatedStack = createDrawerNavigator();

export default function AuthenticatedStackScreen({ navigation }) {
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
      <AuthenticatedStack.Screen
        name="MatchResults"
        component={MatchResultsScreen}
        options={{ headerShown: false }}
      />
      <AuthenticatedStack.Screen name="Profile" component={UserProfileScreen} />
    </AuthenticatedStack.Navigator>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary900,
    height: Platform.OS === "ios" ? 68 : 110, // 100 on iOS, default 56 on Android
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
  },
});
