import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext, AuthProvider } from "../../context/AuthContext";

const SignIn = () => {
  const navigation = useNavigation();

  const { login } = useContext(AuthContext);

  const [isPFocused, setIsPFocused] = useState(false);
  const [isEFocused, setIsEFocused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [hide, setHide] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "flex-start",
          marginTop: SIZES.small,
          marginBottom: SIZES.medium,
        }}
      >
        <Text style={styles.signIn}>Welcome back</Text>
      </View>

      <View style={{ width: "80%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          Username
        </Text>
        <TextInput
          placeholder="Enter your Username"
          placeholderTextColor={COLORS.gray}
          style={styles.email(isEFocused)}
          onFocus={() => {
            setIsEFocused(true);
          }}
          onBlur={() => {
            setIsEFocused(false);
          }}
          onChangeText={(val) => {
            setEmail(val);
          }}
          value={email}
        />
      </View>

      <View style={{}}>
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
              style={styles.password}
              onChangeText={(val) => {
                setPassword(val);
              }}
              value={password}
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

        <TouchableOpacity>
          <Text
            style={{
              color: COLORS.darkyellow,
              padding: SIZES.small - 3,
              alignSelf: "flex-end",
              fontWeight: "500",
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          setIsClicked(true)
          const check = login(email, password);
          if(check){
            navigation.navigate("Home");
            setIsClicked(!check);
          }else{
            setIsClicked(check);
          } 
        }}
        style={styles.button}
      >
        {isClicked ? (
          <ActivityIndicator size="large" color={"black"} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignContent: "center" }}>
        <Text
          style={{
            color: COLORS.lightWhite,
            padding: SIZES.small - 3,
          }}
        >
          Don't have an account?
        </Text>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text
            style={{
              color: COLORS.darkyellow,
              alignSelf: "center",
              fontWeight: "500",
            }}
          >
            Sign-Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

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
});
