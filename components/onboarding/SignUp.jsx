import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [isPFocused, setIsPFocused] = useState(false);
  const [isEFocused, setIsEFocused] = useState(false);
  const [isNFocused, setIsNFocused] = useState(false);
  const [isPNFocused, setIsPNFocused] = useState(false);
  const [isUNFocused, setIsUNFocused] = useState(false);
  const [hide, setHide] = useState(true);

  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "flex-start",
          marginTop: SIZES.small,
          marginBottom: SIZES.medium,
        }}
      >
        <Text style={styles.signIn}>Kindly register with us</Text>
      </View>

      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          Full name
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
        />
      </View>

      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          Password
        </Text>
        <View
          style={{
            borderColor: isPFocused ? COLORS.darkyellow : COLORS.gray,
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
              setIsPFocused(true);
            }}
            onBlur={() => {
              setIsPFocused(false);
            }}
            style={styles.password(isPFocused)}
          />
          <TouchableOpacity style={{alignSelf: "center", justifyContent: 'center', marginLeft: 5 }}
            onPress={() => {
                setHide(!hide);
            }}
          >
            <MaterialCommunityIcons
              name="eye-outline"
              size={SIZES.large}
              color={"white"}
              style={{justifyContent: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          Phone Number 
        </Text>
        <TextInput
          placeholder="Enter your Phone number"
          placeholderTextColor={COLORS.gray}
          style={styles.email(isPNFocused)}
          onFocus={() => {
            setIsPNFocused(true);
          }}
          onBlur={() => {
            setIsPNFocused(false);
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          //   navigate("AutoTrader");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignContent: "center" }}>
        <Text
          style={{
            color: COLORS.lightWhite,
            padding: SIZES.small - 3,
          }}
        >
          Already have an account?
        </Text>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            navigate("SignIn")
          }}
        >
          <Text
            style={{
              color: COLORS.darkyellow,
              alignSelf: "center",
              fontWeight: "500",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  signIn: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
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
});
