import { View, Text, ScrollView } from "react-native";

import { signUpLoginStyles } from "../../constants/commonStyles";

function AuthLayout({ children, headerText }) {
  return (
    <View style={signUpLoginStyles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={signUpLoginStyles.flexContainer}>
            <View style={signUpLoginStyles.content}>
              <Text style={signUpLoginStyles.header}>{headerText}</Text>
              {children}
            </View>
          </View>
      </ScrollView>
    </View>
  );
}

export default AuthLayout;
