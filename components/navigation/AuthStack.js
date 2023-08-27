import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FormProvider } from "../../store/context/FormContext";

import LoginScreen from "../../screens/auth/LoginScreen";
import SignUpScreen from "../../screens/auth/SignUpScreen";
import VerifyEmailScreen from "../../screens/auth/VerifyEmailScreen";
import { authScreenOptions } from "../../constants/navigationScreenOptions";



const AuthStack = createNativeStackNavigator();

export default function AuthStackScreen() {
  return (
    <FormProvider>
      <AuthStack.Navigator
        screenOptions={authScreenOptions}
      >
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="SignUp" component={SignUpScreen} />
        <AuthStack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      </AuthStack.Navigator>
    </FormProvider>
  );
}
