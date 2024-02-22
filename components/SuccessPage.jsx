import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { COLORS } from "../constants";

const SuccessPage = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animation/Anime.json")}
        autoPlay
        loop
      />
      <Text>SuccessPage</Text>
    </View>
  );
};

export default SuccessPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    justifyContent: "center",
  },
});
