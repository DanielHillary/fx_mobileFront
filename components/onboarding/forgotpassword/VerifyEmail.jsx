import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, FONT } from "../../../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { emailVerification, resentOtpCode } from "../../../api/userApi";
import SuccessRegModal from "../../modal/SuccessRegModal";
import Toast from "react-native-toast-message";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  const route = useRoute();

  const userData = route.params?.data || null;

  const setVisibility = (val) => {
    setIsModalVisible(val);
    navigation.navigate("AddAccount", { user: userData });
  };

  const resendOTP = async () => {
    try {
      const response = await resentOtpCode(userData.email).then((res) => {
        return res;
      });
      let resp = response.data;
      if (resp.status) {
        Toast.show({
            type: "success",
            text1: "Email sent successfully",
            text2: "Please check your email for the new OTP code.",
          });
      }
    } catch (error) {
        console.log(error.message);
        Alert.alert("Failed Transaction", "Something went wrong. Please try again");
    }
  };
  const verifyYourEmail = async () => {
    console.log(otp);
    const resp = await emailVerification(otp, userData.email).then((res) => {
      return res;
    });
    let response = resp.data;
    if (response.status) {
      setIsModalVisible(true);
    } else {
      Alert.alert("Failed Transaction", response.message);
    }
  };

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
          height: 70,
          padding: SIZES.small,
          alignContent: "center",
          flexDirection: "row",
          marginHorizontal: 15,
          marginTop: 50,
        }}
      >
        <TextInput
          placeholder="1234"
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
        style={{ alignSelf: "flex-end", margin: 10, marginRight: 20 }}
        onPress={() => {
          resendOTP();
        }}
      >
        <Text style={styles.otpResend}>Resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          verifyYourEmail();
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <SuccessRegModal
          setVisibility={setVisibility}
          message={"Congratulations! You have been verified."}
        />
      </Modal>
    </View>
  );
};

export default VerifyEmail;

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
    height: "auto",
    fontFamily: FONT.bold,
    fontSize: SIZES.large * 2,
  },
  otpResend: {
    color: COLORS.darkyellow,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
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
    position: "absolute",
    bottom: 100,
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
