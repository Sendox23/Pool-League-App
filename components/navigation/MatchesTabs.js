import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MatchHistoryScreen from "../../screens/matches/MatchHistoryScreen";
import ScheduleMatchScreen from "../../screens/matches/ScheduleMatchScreen";
import { Colors } from "../../constants/colors";

const MatchesTabsNavigator = createBottomTabNavigator();

export default function MatchesTabs({ route, navigation }) {
  return (
    <MatchesTabsNavigator.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => (
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={styles.backButton}
            onPress={() => navigation.navigate("Leagues")}
          />
        ),
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    >
      <MatchesTabsNavigator.Screen
        name="Schedule Match"
        component={ScheduleMatchScreen}
        initialParams={{ leagueType: route.params?.leagueType }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <MatchesTabsNavigator.Screen
        name="Match History"
        component={MatchHistoryScreen}
        initialParams={{ leagueType: route.params?.leagueType }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
        }}
      />
    </MatchesTabsNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
    color: "white",
  },
  header: {
    backgroundColor: Colors.secondary700,
  },
  headerTitle: {
    color: "white",
  },
});
