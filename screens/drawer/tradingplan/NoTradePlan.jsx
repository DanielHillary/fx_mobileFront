import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import EmptyList from "../../../components/EmptyList";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, FONT } from "../../../constants";

const NoTradePlan = ({ accountInfo }) => {
  const [isClicked, setIsClicked] = useState(false);

  const navigation = useNavigation();
  return (
    <View style={styles.baseContainer}>
      <EmptyList message={"No trading plan registered"} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SetUpTradingPlan", { account: accountInfo });
        }}
        style={styles.buttonContinue}
      >
        {isClicked ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Set up Plan</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NoTradePlan;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  buttonContinue: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 200,
    marginTop: 40,
    alignSelf: "center",
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    fontSize: SIZES.large,
    color: "black",
    fontFamily: FONT.bold,
  },
});
