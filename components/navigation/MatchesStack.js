import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CurrentMatchScreen from "../../screens/matches/CurrentMatchScreen";
import MatchHistoryScreen from "../../screens/matches/MatchHistoryScreen";
import UpcomingMatchesScreen from "../../screens/matches/UpcomingMatchesScreen";

const MatchesTabsNavigator = createBottomTabNavigator();

export default function MatchesTabsScreen({ route }) {
  return (
    <MatchesTabsNavigator.Navigator screenOptions={{ headerShown: false }}>
      <MatchesTabsNavigator.Screen
        name="Upcoming"
        children={() => (
          <UpcomingMatchesScreen leagueType={route.params?.leagueType} />
        )}
      />
      <MatchesTabsNavigator.Screen
        name="Current Match"
        children={() => (
          <CurrentMatchScreen leagueType={route.params?.leagueType} />
        )}
      />
      <MatchesTabsNavigator.Screen
        name="Match History"
        children={() => (
          <MatchHistoryScreen leagueType={route.params?.leagueType} />
        )}
      />
    </MatchesTabsNavigator.Navigator>
  );
}
