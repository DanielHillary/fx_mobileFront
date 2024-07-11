import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChoosePlan = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const accountInfo = route.params?.account || null;
  return (
    <View style={styles.baseContainer}>
      <Text style={styles.text}>
        Please choose a payment plan to continue setting up your account OR continue with the 7 DAYS trial period.
      </Text>


      <View
        style={{
          backgroundColor: COLORS.secondary,
          height: 0.5,
          width: "100%",
          marginVertical: 10,
        }}
      />


      <Text style={[styles.text, { marginTop: 30 }]}>
        You can continue with your account registration and have Free access to
        our features for the next 7 DAYS.{" "}
      </Text>

      <Text style={[styles.text, { marginTop: 30 }]}>
        In this 7 days, any violation to the refund policy would be ignored.
        This gives you a chance to get acquainted with the rules and
        guidelines.We encourage you to upgrade your account to a paid service
        before the trial period expires.
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: SIZES.medium * 2,
          paddingHorizontal: SIZES.medium * 1.5,
          position: "absolute",
          bottom: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SetUpTradingPlan", {
              account: accountInfo,
            });
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue for Free</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Pricing");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Choose Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChoosePlan;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 135,
    marginTop: 30,
    alignSelf: "center",
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    fontSize: SIZES.medium,
    color: "black",
    fontFamily: FONT.bold,
  },
});
