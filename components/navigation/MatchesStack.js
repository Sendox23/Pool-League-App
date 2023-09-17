import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MatchesTabs from "./MatchesTabs";
import CurrentMatchScreen from "../../screens/matches/CurrentMatchScreen";
const MatchesStackNavigator = createNativeStackNavigator();

export function MatchesStack({ route, navigation }) {
  return (
    <MatchesStackNavigator.Navigator
      screenOptions={{
        headerShown: false,  // You can modify this if you want headers.
      }}
    >
      <MatchesStackNavigator.Screen
        name="MatchesTabs"
        component={MatchesTabs}
        initialParams={{ leagueType: route.params?.leagueType }}
      />
      <MatchesStackNavigator.Screen
        name="CurrentMatch"
        component={CurrentMatchScreen}
        initialParams={{ leagueType: route.params?.leagueType }}
      />
    </MatchesStackNavigator.Navigator>
  );
}
