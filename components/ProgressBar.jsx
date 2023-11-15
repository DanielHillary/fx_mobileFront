import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import React, { useState } from "react";
import { COLORS, FONT, SIZES } from "../constants";

const ProgressBar = () => {
  const [status, setStatus] = useState(0);
  return (
    <View style={styles.progress}>
      <View style={{ flexDirection: "row" }}>
        <CircularProgress
          value={50}
          radius={35}
          progressValueColor={COLORS.darkyellow}
          inActiveStrokeColor={"grey"}
          inActiveStrokeOpacity={0.5}
          clockwise={true}
        />

        <View style={styles.text}>
          <Text style={{fontFamily: FONT.bold, color: COLORS.lightWhite, fontSize: SIZES.large}}>Setup your Account</Text>
          <Text style={{color: COLORS.lightWhite,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,}}>
           You have 2 more steps to go. Please endeavor to complete your trading plan. 
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progress: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#212121"
  },
  text: {
    width: 200,
    paddingVertical: 10,
    marginLeft: 20,
  },
});
