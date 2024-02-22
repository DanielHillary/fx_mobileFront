import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES, FONT } from "../../constants";
import AwesomeAlert from "react-native-awesome-alerts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { resetPassword } from "../../api/userApi";
import { AuthContext } from "../../context/AuthContext";

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
  const [isCNewPFocused, setIsCNewPFocused] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [cNewPassword, setCNewPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [check, setCheck] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hide, setHide] = useState(true);
  const [hideP, setHideP] = useState(true);
  const [hideOp, setHideOp] = useState(true);

  const { userInfo, logout } = useContext(AuthContext);

  const comparePassWord = (val) => {
    if (newPassword === val) {
      setIsConfirmed(true);
      return true;
    } else {
      setIsConfirmed(false);
      return false;
    }
  };

  const resetPassWord = async () => {
    try {
      setIsClicked(true);
      const response = await resetPassword(
        userInfo.user.email,
        newPassword
      ).then((res) => {
        return res.data;
      });
      if (response.status) {
        setIsClicked(false);
        logout();
      } else {
        console.log(response.message);
      }
    } catch (error) {
      setIsClicked(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.baseContainer}>
      <View style={{ width: "90%", marginTop: SIZES.xSmall }}>
        <Text style={styles.text}>Old Password</Text>
        <View
          style={{
            borderColor: isOldPFocused ? COLORS.darkyellow : COLORS.gray,
            borderWidth: 0.5,
            borderRadius: SIZES.small,
            height: 50,
            padding: SIZES.small,
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <TextInput
            secureTextEntry={hideOp}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.gray}
            onFocus={() => {
              setIsOldPFocused(true);
            }}
            onBlur={() => {
              setIsOldPFocused(false);
            }}
            style={styles.password}
            onChangeText={(val) => {
              setOldPassword(val);
            }}
            value={oldPassword}
          />
          <TouchableOpacity
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginLeft: 5,
            }}
            onPress={() => {
              setHideOp(!hideOp);
            }}
          >
            <MaterialCommunityIcons
              name="eye-outline"
              size={SIZES.large}
              color={"white"}
              style={{ justifyContent: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: "90%", marginTop: SIZES.large * 2 }}>
        <Text style={styles.text}>New Password</Text>
        <View
          style={{
            borderColor: isNewPFocused ? COLORS.darkyellow : COLORS.gray,
            borderWidth: 0.5,
            borderRadius: SIZES.small,
            height: 50,
            padding: SIZES.small,
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <TextInput
            secureTextEntry={hideP}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.gray}
            onFocus={() => {
              setIsNewPFocused(true);
            }}
            onBlur={() => {
              setIsNewPFocused(false);
            }}
            style={styles.password}
            onChangeText={(val) => {
              setNewPassword(val);
            }}
            value={newPassword}
          />
          <TouchableOpacity
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginLeft: 5,
            }}
            onPress={() => {
              setHideP(!hideP);
            }}
          >
            <MaterialCommunityIcons
              name="eye-outline"
              size={SIZES.large}
              color={"white"}
              style={{ justifyContent: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: "90%", marginTop: SIZES.large * 2 }}>
        <Text style={styles.text}>Confirm New Password</Text>
        <View
          style={{
            borderColor: isCNewPFocused ? COLORS.darkyellow : COLORS.gray,
            borderWidth: 0.5,
            borderRadius: SIZES.small,
            height: 50,
            padding: SIZES.small,
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <TextInput
            secureTextEntry={hide}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.gray}
            onFocus={() => {
              setIsCNewPFocused(true);
            }}
            onBlur={() => {
              setIsCNewPFocused(false);
            }}
            style={styles.password}
            onChangeText={(val) => {
              setCNewPassword(val);
              comparePassWord(val);
            }}
            value={cNewPassword}
          />
          <TouchableOpacity
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginLeft: 5,
            }}
            onPress={() => {
              setHide(!hide);
            }}
          >
            <MaterialCommunityIcons
              name="eye-outline"
              size={SIZES.large}
              color={"white"}
              style={{ justifyContent: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={
          isConfirmed
            ? require("../../assets/icons/good.png")
            : require("../../assets/icons/badmark.png")
        }
        style={{
          height: 15,
          width: 15,
          margin: 7,
          alignSelf: "flex-end",
          marginRight: SIZES.large * 1.8,
        }}
      />

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
          resetPassWord();
        }}
      />

      <TouchableOpacity
        onPress={() => {
          if (comparePassWord(cNewPassword)) {
            setCheck(true);
          } else {
            Alert.alert("", "Please confirm the new password");
          }
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
  password: {
    color: COLORS.white,
    width: "90%",
  },
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
