import React from "react";
import { Image, Text, StyleSheet } from "react-native";

export default function LeagueImage({ leagueType, height, width }) {
  const renderImageByLeagueType = (leagueType) => {
    if (leagueType === "Eight Ball") {
      return (
        <Image
          style={[styles.image, { height, width }]}
          source={require("../../assets/images/8ball.png")}
          resizeMode="contain" 
        />
      );
    } else if (leagueType === "Nine Ball") {
      return (
        <Image
          style={[styles.image, { height, width }]}
          source={require("../../assets/images/9ball.png")}
          resizeMode="contain"
        />
      );
    } else if (leagueType === "Ten Ball") {
      return (
        <Image
          style={[styles.image, { height, width }]}
          source={require("../../assets/images/10ball.png")}
          resizeMode="contain"
        />
      );
    } else {
      return <Text>Unsupported league type</Text>;
    }
  };

  return <>{renderImageByLeagueType(leagueType)}</>;
}

const styles = StyleSheet.create({
  image: {
    marginBottom: 5,
  },
});