import { View, Text } from "react-native";

export default function CurrentMatchScreen({ route }) {
  const leagueType = route.params?.leagueType;
  
  return (
    <View>
      <Text>Current Match Screen</Text>
    </View>
  );
}
