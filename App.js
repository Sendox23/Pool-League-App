import { useContext } from "react";
import { StatusBar} from "expo-status-bar";
import { SafeAreaView, Platform  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import LoadingSpinner from "./components/ui/LoadingSpinner";
import AuthenticatedStackScreen from "./components/navigation/AuthenticatedStack";
import AuthStackScreen from "./components/navigation/AuthStack";

import { AuthContext, AuthProvider } from "./store/context/AuthContext";

function Root() {
  const { isAuthenticated, isLoadingAuth } = useContext(AuthContext);

  if (isLoadingAuth) {
    return <LoadingSpinner />;
  }

  const Screen = isAuthenticated ? AuthenticatedStackScreen : AuthStackScreen;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'light'} />
      <NavigationContainer>
        <Screen />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
