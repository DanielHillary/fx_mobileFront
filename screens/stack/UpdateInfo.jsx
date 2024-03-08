import {
  Alert,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { registerNewUser, updateUserInformation } from "../../api/userApi";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../context/AuthContext";
import SuccessModal from "../../components/modal/SuccessModal";
import AlertModal from "../../components/modal/AlertModal";

const UpdateInfo = () => {
  const [isEFocused, setIsEFocused] = useState(false);
  const [isNFocused, setIsNFocused] = useState(false);
  const [isPNFocused, setIsPNFocused] = useState(false);
  const [isUNFocused, setIsUNFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [previousEmail, setPreviousEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isClicked, setIsClicked] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [check, setCheck] = useState(false);

  const setVisibility = (val) => {
    setIsModalVisible(val);
    logout();
  };

  const navigation = useNavigation();

  const { userInfo, updateUserInfo, logout } = useContext(AuthContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setUserInfo = () => {
    let user = userInfo.user;
    setFullName(user.firstName + " " + user.lastName);
    setUserName(user.userName);
    setEmail(user.email);
    setPreviousEmail(user.email);
    setPhoneNumber(user.phoneNumber);
  };

  const updateDetails = async () => {
    setIsClicked(true);

    if (
      email.length === 0 ||
      userName.length === 0 ||
      fullName.length === 0 ||
      phoneNumber.length === 0
    ) {
      Alert.alert("", "Please fill out ALL the fields before proceeding");
    } else if (!emailRegex.test(email)) {
      Alert.alert(
        "",
        "The email you provided doesn't match the right format. Please check and try again"
      );
    } else {
      let individualNames = fullName.split(" ");

      let user = userInfo.user;

      user.email = email;
      user.firstName = individualNames[0];
      user.lastName = individualNames[1];
      user.phoneNumber = phoneNumber;
      user.userName = userName;

      console.log(user);

      const response = await updateUserInformation(user).then((res) => {
        return res.data;
      });

      if (response.status) {
        Toast.show({
          type: "success",
          text1: "Successful Registration",
          text2: "You have successfully updated your profile",
        });
        if (previousEmail !== email) {
          navigation.navigate("VerifyUpdateEmail", { data: user });
        } else {
          setIsModalVisible(true);
          setIsClicked(false);
        }
      } else {
        console.log(response.message);
        Alert.alert("Failed transaction", response.message);
      }
    }
    setIsClicked(false);
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginTop: SIZES.small,
          marginBottom: SIZES.medium,
        }}
      >
        <Text style={styles.signIn}>Edit your profile</Text>
      </View>

      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          Full name "eg. Jane Doe"
        </Text>
        <TextInput
          placeholder="Enter your Full Name"
          placeholderTextColor={COLORS.gray}
          style={styles.email(isNFocused)}
          onFocus={() => {
            setIsNFocused(true);
          }}
          onBlur={() => {
            setIsNFocused(false);
          }}
          onChangeText={(text) => {
            setFullName(text);
          }}
          value={fullName}
        />
      </View>

      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          Username
        </Text>
        <TextInput
          placeholder="Enter your userName"
          placeholderTextColor={COLORS.gray}
          style={styles.email(isUNFocused)}
          onFocus={() => {
            setIsUNFocused(true);
          }}
          onBlur={() => {
            setIsUNFocused(false);
          }}
          onChangeText={(val) => {
            setUserName(val);
          }}
          value={userName}
        />
      </View>

      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          Email
        </Text>
        <TextInput
          placeholder="Enter your Email"
          placeholderTextColor={COLORS.gray}
          style={styles.email(isEFocused)}
          onFocus={() => {
            setIsEFocused(true);
          }}
          onBlur={() => {
            setIsEFocused(false);
          }}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
      </View>

      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          Phone Number
        </Text>
        <TextInput
          placeholder="Enter your Phone number"
          placeholderTextColor={COLORS.gray}
          keyboardType="numeric"
          style={styles.email(isPNFocused)}
          onFocus={() => {
            setIsPNFocused(true);
          }}
          onBlur={() => {
            setIsPNFocused(false);
          }}
          onChangeText={(val) => {
            setPhoneNumber(val);
          }}
          value={phoneNumber}
        />
      </View>

      <Text
        style={[
          styles.text,
          { marginTop: 30, fontStyle: "italic", color: COLORS.darkyellow },
        ]}
      >
        Note: If you change your email, You will need to verify this new email
        to continue using the application.
      </Text>

      <TouchableOpacity
        onPress={() => {
          setCheck(true);
        }}
        style={styles.button}
      >
        {isClicked ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Update profile</Text>
        )}
      </TouchableOpacity>

      <AlertModal
        isAlert={check}
        handleCancel={() => {
          setCheck(false);
        }}
        handleConfirm={() => {
          setCheck(false);
          updateDetails();
        }}
        message={
          'Please be sure to confirm that the details provided are accurate. If so, click "Continue" to proceed'
        }
        showCancelButton={true}
        showConfirmButton={true}
        title={"Check Details"}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <SuccessModal setVisibility={setVisibility} />
      </Modal>
      <Toast />
    </ScrollView>
  );
};

export default UpdateInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  signIn: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    alignSelf: "center",
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    marginTop: SIZES.small,
  },
  email: (focused) => ({
    borderColor: focused ? COLORS.darkyellow : COLORS.gray,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    height: 50,
    color: COLORS.white,
  }),
  password: () => ({
    color: COLORS.white,
    width: "90%",
  }),
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 80,
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
