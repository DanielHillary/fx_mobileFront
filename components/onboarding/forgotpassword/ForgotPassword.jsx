import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, FONT } from "../../../constants";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  return (
    <View style={styles.base}>
      <Text style={styles.text}>
        We sent an OTP to your mail. Please enter below to confirm your
        identity.
      </Text>

      <View
        style={{
          borderColor: isFocused ? COLORS.darkyellow : COLORS.gray,
          borderWidth: 0.5,
          borderRadius: SIZES.small,
          height: 50,
          padding: SIZES.small,
          alignContent: "center",
          flexDirection: "row",
          margin: 20,
        }}
      >
        <TextInput
          placeholder="12345"
          placeholderTextColor={COLORS.gray}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={styles.password}
          onChangeText={(val) => {
            setOtp(val);
          }}
          value={otp}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate("ResetPassword");
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  text: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  password: {
    color: COLORS.white,
    width: "90%",
  },
  buttonStyle: {
    backgroundColor: COLORS.darkyellow,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    width: "85%",
    height: 50,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignSelf: "center",
    padding: SIZES.small,
    position: "relative",
    marginTop: 90,
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    padding: 3,
    fontSize: SIZES.large,
    color: "black",
    fontFamily: FONT.bold,
  },
});
