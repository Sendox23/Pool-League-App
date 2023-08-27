import { View, Image, StyleSheet } from "react-native";
import { commonScreenStyle } from "../../constants/commonStyles";
import { TouchableOpacity } from "react-native";

export default function LeaguesScreen({ navigation }) {
  const handleImagePress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={commonScreenStyle.container}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleImagePress("Eight Ball")}
        activeOpacity={0.7}
      >
        <Image
          style={styles.images}
          source={require("../../assets/images/8ball.png")}
        />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleImagePress("Nine Ball")}
          activeOpacity={0.7}
        >
          <Image
            style={styles.images}
            source={require("../../assets/images/9ball.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleImagePress("Ten Ball")}
          activeOpacity={0.7}
        >
          <Image
            style={styles.images}
            source={require("../../assets/images/10ball.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    margin: 10,
  },
  images: {
    width: 100,
    height: 100,
  },
});
