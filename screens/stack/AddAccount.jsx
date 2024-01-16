import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONT, SIZES } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserAccont, registerMetaApiAccount } from "../../api/accountApi";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const AlertModal = ({
  title,
  isAlert,
  handleConfirm,
  handleCancel,
  showCancelButton = true,
}) => {
  return (
    <View>
      <AwesomeAlert
        show={isAlert}
        title={title}
        titleStyle={styles.title}
        contentContainerStyle={styles.alertContainer}
        showConfirmButton={true}
        showCancelButton={showCancelButton}
        onCancelPressed={handleCancel}
        onConfirmPressed={handleConfirm}
        closeOnTouchOutside={true}
        onDismiss={handleCancel}
      />
    </View>
  );
};

const Options = ({ setAccount }) => {
  const [mt4, setMt4] = useState(false);
  const [mt5, setMt5] = useState(false);

  const setRestInActive = (item) => {
    let search = "";
    if (item == "mt4") {
      search = item;
      setMt5(false);
    } else if (item == "mt5") {
      search = item;
      setMt4(false);
    }
    return search;
  };

  return (
    <View style={{ marginTop: SIZES.medium - 3, rowGap: SIZES.xSmall }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.medium,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setMt4(true);
            setAccount(setRestInActive("mt4"));
          }}
          style={{ flexDirection: "row" }}
        >
          <View>
            {mt4 ? (
              <Image
                source={require("../../assets/icons/checkbox.png")}
                style={styles.image}
              />
            ) : (
              <View style={styles.checkbox} />
            )}
          </View>

          <View style={{ width: 120, marginLeft: 8 }}>
            <Text style={[styles.optionText, { fontSize: SIZES.large }]}>
              MetaTrader 4
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.medium,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setMt5(true);
            setAccount(setRestInActive("mt5"));
          }}
          style={{ flexDirection: "row" }}
        >
          <View>
            {mt5 ? (
              <Image
                source={require("../../assets/icons/checkbox.png")}
                style={styles.image}
              />
            ) : (
              <View style={styles.checkbox} />
            )}
          </View>

          <View style={{ width: 120, marginLeft: 8 }}>
            <Text style={[styles.optionText, { fontSize: SIZES.large }]}>
              MetaTrader 5
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AddAccount = () => {
  const [brokerFocused, setBrokerFocused] = useState(false);
  const [loginFocused, setLoginFocused] = useState(false);
  const [isPFocused, setIsPFocused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [brokerValue, setBrokerValue] = useState("");
  const [loginValue, setLoginValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const [userData, setUserData] = useState({});
  const [option, setOption] = useState("");
  const [accountInfo, setAccountInfo] = useState({});

  const navigation = useNavigation();

  const { updateAccount } = useContext(AuthContext);

  const route = useRoute();

  const userInfo = route.params?.user || null;

  const setAccountType = (data) => {
    setOption(data);
  };

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      // let user = await AsyncStorage.getItem("userInfo");
      // let userInfo = JSON.parse(user)
      // console.log(userInfo);
      if (userInfo) {
        setUserData(userInfo);
      }
      setIsLoading(false);
      // const account = await AsyncStorage.getItem("accountInfo").then((res) => {
      //   return JSON.parse(res);
      // })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const registerAccount = async () => {
    const account = {
      brokerServer: brokerValue,
      login: loginValue,
      metaPassWord: passValue,
      platForm: option,
      userId: userInfo.userId,
      userName: userInfo.userName,
      defaultAccount: true,
    };

    const response = await registerMetaApiAccount(account).then((res) => {
      return res.data;
    });
    setIsClicked(false);
    if (response.status) {
        updateAccount(response.data.account);
        AsyncStorage.setItem(
          "accountInfo",
          JSON.stringify(response.data.account)
        );
        navigation.navigate("SetUpTradingPlan", {
          account: response.data.account,
        });
    } else {
      console.log(response.message);
    }
  };

  return (
    <View style={styles.baseContainer}>
      <View style={styles.introContainer}>
        <Text style={styles.intro}>Trading Account Registration</Text>
        <Text style={styles.text}>
          All information shared with us are private and secure. We do not
          intend to share them with third-party.
        </Text>
      </View>

      <View style={{}}>
        <View style={{ width: "80%", marginTop: SIZES.medium }}>
          <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
            Broker
          </Text>
          <TextInput
            placeholder="Enter Broker Server"
            placeholderTextColor={COLORS.gray}
            style={styles.email(brokerFocused)}
            onChangeText={(text) => {
              setBrokerValue(text);
            }}
            value={brokerValue}
            onFocus={() => {
              setBrokerFocused(true);
            }}
            onBlur={() => {
              setBrokerFocused(false);
            }}
          />
        </View>

        <View style={{ width: "80%", marginTop: SIZES.medium }}>
          <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
            Trading account number
          </Text>
          <TextInput
            placeholder="Enter your login"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
            style={styles.email(loginFocused)}
            onChangeText={(text) => {
              setLoginValue(text);
            }}
            value={loginValue}
            onFocus={() => {
              setLoginFocused(true);
            }}
            onBlur={() => {
              setLoginFocused(false);
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
              onChangeText={(text) => {
                setPassValue(text);
              }}
              value={passValue}
              onFocus={() => {
                setIsPFocused(true);
              }}
              onBlur={() => {
                setIsPFocused(false);
              }}
              style={styles.password(isPFocused)}
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
      </View>

      <Options setAccount={setAccountType} />

      <TouchableOpacity
        onPress={() => {
          //   navigate("AutoTrader");
          setIsClicked(true);
          registerAccount();
        }}
        style={styles.button}
      >
        {isClicked ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Register Account</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddAccount;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    padding: SIZES.medium,
  },
  intro: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
  },
  text: {
    color: COLORS.lightWhite,
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
  image: {
    height: 20,
    width: 20,
    marginLeft: 5,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    borderRadius: 15,
    marginLeft: 5,
  },
  optionText: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
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
