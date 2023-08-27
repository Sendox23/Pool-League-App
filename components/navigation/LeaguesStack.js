import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LeaguesScreen from "../../screens/leagues/LeaguesScreen";
import MatchesTabsScreen from "./MatchesStack";

const LeaguesStack = createNativeStackNavigator();

export default function LeaguesStackScreen() {
  return (
    <LeaguesStack.Navigator>
      <LeaguesStack.Screen
        name="Leagues"
        component={LeaguesScreen}
        options={{ headerShown: false }}
      />
      <LeaguesStack.Screen name="Eight Ball" component={MatchesTabsScreen} />
      <LeaguesStack.Screen name="Nine Ball" component={MatchesTabsScreen} />
      <LeaguesStack.Screen name="Ten Ball" component={MatchesTabsScreen} />
    </LeaguesStack.Navigator>
  );
}
