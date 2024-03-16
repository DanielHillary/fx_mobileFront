import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import React, { useState } from "react";
import { COLORS, FONT, SIZES } from "../constants";

const ProgressBar = ({ status }) => {
  
  let complete = "Complete Account";
  let incomplete = "Setup Your Account";

  let number = 4 - ((status/100) * 4);
  return (
    <View style={styles.progress}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <CircularProgress
          value={status}
          radius={35}
          progressValueColor={COLORS.darkyellow}
          inActiveStrokeColor={"grey"}
          inActiveStrokeOpacity={0.5}
          clockwise={true}
        />

        <View style={styles.text}>
          <Text
            style={{
              fontFamily: FONT.bold,
              color: COLORS.lightWhite,
              fontSize: SIZES.large,
            }}
          >
            {status != 100 ? incomplete : complete}
          </Text>
          {status != 100 ? (
            <Text
              style={{
                color: COLORS.lightWhite,
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
              }}
            >
              You have {number} more steps to go. Please endeavor to complete your
              trading plan.
            </Text>
          ) : (
            <Text
              style={{
                color: COLORS.lightWhite,
                fontFamily: FONT.regular,
                fontSize: SIZES.small,
              }}
            >
              You have completed the onboarding process. Do well to stick to
              your trading plan to achieve maximum results in your trading
              journey.
            </Text>
          )}
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
    backgroundColor: "#212121",
  },
  text: {
    width: 200,
    paddingVertical: 10,
    marginLeft: 20,
  },
});
