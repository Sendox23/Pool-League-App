import { createDrawerNavigator } from "@react-navigation/drawer";

import LeaguesStackScreen from "./LeaguesStack";
import UserProfileScreen from "../../screens/userProfile/UserProfileScreen";

const AuthenticatedStack = createDrawerNavigator();

export default function AuthenticatedStackScreen() {
  return (
    <AuthenticatedStack.Navigator>
      <AuthenticatedStack.Screen
        name="Leagues Home"
        component={LeaguesStackScreen}
      />
      <AuthenticatedStack.Screen name="Profile" component={UserProfileScreen} />
    </AuthenticatedStack.Navigator>
  );
}
