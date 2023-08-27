import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CurrentMatchScreen from "../../screens/matches/CurrentMatchScreen";
import MatchHistoryScreen from "../../screens/matches/MatchHistoryScreen";
import UpcomingMatchesScreen from "../../screens/matches/UpcomingMatchesScreen";

const MatchesTabsNavigator = createBottomTabNavigator();

export default function MatchesTabsScreen() {
  return (
    <MatchesTabsNavigator.Navigator>
      <MatchesTabsNavigator.Screen
        name="Upcoming"
        component={UpcomingMatchesScreen}
      />
      <MatchesTabsNavigator.Screen
        name="Current Match"
        component={CurrentMatchScreen}
      />
      <MatchesTabsNavigator.Screen
        name="Match History"
        component={MatchHistoryScreen}
      />
    </MatchesTabsNavigator.Navigator>
  );
}
