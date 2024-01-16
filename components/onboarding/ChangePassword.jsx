import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, FONT } from "../../constants";
import AwesomeAlert from "react-native-awesome-alerts";

const AlertModal = ({
  title,
  isAlert,
  handleConfirm,
  handleCancel,
  showCancelButton,
  showConfirmButton,
  message,
}) => {
  return (
    <View>
      <AwesomeAlert
        show={isAlert}
        title={title}
        titleStyle={styles.title}
        contentContainerStyle={styles.alertContainer}
        showConfirmButton={showConfirmButton}
        showCancelButton={showCancelButton}
        cancelButtonColor={COLORS.darkyellow}
        cancelButtonTextStyle={styles.alertText}
        cancelText="Cancel"
        confirmButtonColor={COLORS.darkyellow}
        confirmButtonTextStyle={styles.alertText}
        confirmText="Reset"
        onCancelPressed={handleCancel}
        onConfirmPressed={handleConfirm}
        closeOnTouchOutside={true}
        onDismiss={handleCancel}
        message={message}
        messageStyle={styles.alertMessage}
      />
    </View>
  );
};

const ChangePassword = () => {
  const [isOldPFocused, setIsOldPFocused] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [isNewPFocused, setIsNewPFocused] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [check, setCheck] = useState(false);

  return (
    <View style={styles.baseContainer}>
      <Text style={styles.text}>Old Password</Text>
      <TextInput
        placeholder="Enter old password"
        placeholderTextColor={COLORS.gray}
        style={styles.email(isOldPFocused)}
        onFocus={() => {
          setIsOldPFocused(true);
        }}
        onBlur={() => {
          setIsOldPFocused(false);
        }}
        onChangeText={(val) => {
          setOldPassword(val);
        }}
        value={oldPassword}
      />
      <View style={{ marginTop: SIZES.large }}>
        <Text style={styles.text}>New Password</Text>
        <TextInput
          placeholder="Enter new password"
          placeholderTextColor={COLORS.gray}
          style={styles.email(isNewPFocused)}
          onFocus={() => {
            setIsNewPFocused(true);
          }}
          onBlur={() => {
            setIsNewPFocused(false);
          }}
          onChangeText={(val) => {
            setNewPassword(val);
          }}
          value={newPassword}
        />
      </View>

      <AlertModal
        isAlert={check}
        message={"Are you sure you want to reset your password?"}
        showCancelButton={true}
        showConfirmButton={true}
        handleCancel={() => {
          setCheck(false);
        }}
        handleConfirm={() => {
          setCheck(false);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setCheck(true);
        }}
        style={styles.button}
      >
        {isClicked ? (
          <ActivityIndicator size="large" color={"black"} />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    marginLeft: SIZES.xSmall - 4,
    marginBottom: SIZES.xSmall - 5,
  },
  email: (focused) => ({
    padding: SIZES.small,
    borderColor: focused ? COLORS.darkyellow : COLORS.gray,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    height: 50,
    color: COLORS.white,
  }),
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 60,
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
  alertMessage: {
    color: COLORS.white,
    textAlign: "center",
  },
  alertText: {
    color: "black",
    fontFamily: FONT.bold,
  },
  alertContainer: {
    backgroundColor: "black",
    borderRadius: SIZES.medium,
    width: 200,
  },
});
