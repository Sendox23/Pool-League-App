import { useState, useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { commonScreenStyle } from "../../constants/commonStyles";
import { TouchableOpacity } from "react-native";

import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { AuthContext } from "../../store/context/AuthContext";
import { isUserInLeague } from "../../util/firebase/databaseFunctions/leagueFunctions";
import ErrorComponent from "../../components/ui/ErrorComponent";

export default function LeaguesScreen({ navigation }) {
  const userCtx = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImagePress = async (screenName, params) => {
    try {
      setIsLoading(true); // Set loading to true before making the request
      setError(null); // Clear any previous errors

      const userInLeague = await isUserInLeague(
        userCtx.user.uid,
        params.leagueType
      );

      if (!userInLeague) {
        setMessage(
          `You are currently not in a ${params.leagueType} league. Please contact the league owner to request to join.`
        );
      } else {
        setMessage("");
        navigation.navigate(screenName, params);
      }
    } catch (err) {
      setError(err.message); // Handle any errors and set the error message
    } finally {
      setIsLoading(false); // Set loading to false after the request is completed
    }
  };
  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <View style={commonScreenStyle.container}>
      {message ? <Text style={styles.messageStyle}>{message}</Text> : null}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() =>
          handleImagePress("Eight Ball", { leagueType: "Eight Ball" })
        }
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
          onPress={() =>
            handleImagePress("Nine Ball", { leagueType: "Nine Ball" })
          }
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
          onPress={() =>
            handleImagePress("Ten Ball", { leagueType: "Ten Ball" })
          }
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
  messageStyle: {
    fontSize: 18,
    backgroundColor: "#ffdddd", // Light red background
    color: "#d33", // Dark red text
    padding: 10,
    borderRadius: 5,
    margin: 20,
    textAlign: "center",
    maxWidth: "90%", // Ensures the message doesn't take the full width
    alignSelf: "center", // Aligns the message to the center of its container
  },
  imageContainer: {
    margin: 10,
  },
  images: {
    width: 100,
    height: 100,
  },
});
