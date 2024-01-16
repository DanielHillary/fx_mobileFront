import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation, useRoute } from "@react-navigation/native";
import { registerTradingPlan } from "../../api/tradingplanApi";

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
        // titleStyle={styles.title}
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

const Options = ({ setAccount, setAgreed }) => {
  const [regular, setRegular] = useState(true);
  const [strict, setStrict] = useState(false);
  const [agree, setAgree] = useState(false);

  const setRestInActive = (item) => {
    let search = "";
    if (item == "strict") {
      search = item;
      setRegular(false);
    } else if (item == "regular") {
      search = item;
      setStrict(false);
      setAgreed(false);
    }
    setAccount(item);
    return search;
  };

  return (
    <View style={{ marginTop: SIZES.medium - 3, rowGap: SIZES.xSmall }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: SIZES.small - 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setRegular(true);
            setRestInActive("regular");
          }}
          style={styles.accountType(regular)}
        >
          <View>
            <Text style={[styles.texting(regular), { fontSize: SIZES.medium }]}>
              Regular
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setStrict(true);
            setRestInActive("strict");
          }}
          style={styles.accountType(strict)}
        >
          <View>
            <Text style={[styles.texting(strict), { fontSize: SIZES.medium }]}>
              Strict
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        {regular ? (
          <Text
            style={[
              styles.text,
              {
                padding: SIZES.small,
                fontFamily: FONT.medium,
                fontSize: SIZES.medium - 2,
              },
            ]}
          >
            This is the basic service we provide for traders. You would get a
            warning and be scored poorly if you neglect any of your trading
            plans for every trade that you take.
          </Text>
        ) : (
          <Text
            style={[
              styles.text,
              {
                padding: SIZES.small,
                fontFamily: FONT.medium,
                fontSize: SIZES.medium - 2,
              },
            ]}
          >
            In order to use this service, you have to agree to our terms and
            condition. This service strictly monitors ALL your trades and would
            shut down any trade that is not in compliance with your trading
            plan.
          </Text>
        )}

        {strict && (
          <TouchableOpacity
            onPress={() => {
              setAgree(!agree);
              setAgreed(!agree);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: SIZES.small,
            }}
          >
            <View>
              {agree ? (
                <Image
                  source={require("../../assets/icons/checkbox.png")}
                  style={styles.image}
                />
              ) : (
                <View style={styles.checkbox} />
              )}
            </View>

            <View style={{ width: "auto", marginLeft: 8 }}>
              <Text style={[styles.intro, { fontSize: SIZES.small }]}>
                I have read and agree to the terms and condition.
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const SetUpTradingPlan = () => {
  const [entryFocused, setEntryFocused] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const navigation = useNavigation();

  const route = useRoute();

  const account = route.params?.account || null;

  console.log(account);

  const setAgreement = (data) => {
    setIsAgree(data);
  };

  const setAccount = (data) => {
    setAccountType(data);
  };

  const continueToRegister = async () => {
    const body = {
      accountNumber: account.accountNumber,
      default: true,
      planName: "Jumbo",
      planOutline: "For Investment",
      planOwner: account.userId,
      traderType: "Swing trader",
      userAccountId: account.accountId,
      strict: isAgree,
    };
    if (accountType == "strict") {
      if (isAgree) {
        account.isStrict = isAgree;
        body.strict = isAgree;
        const response = await registerTradingPlan(body).then((res) => {
          return res.data;
        });
        if (response.status) {
          navigation.navigate("EntryStrategy", { account: account, tradePlan : response.data });
          console.log("Successful");
          console.log(isAgree, accountType);
        }else{
          console.log(response.message);
        }
      } else {
        alert("Please you have to agree to the terms and condition to proceed");
      }
    } else {
      account.isStrict = isAgree;
      const response = await registerTradingPlan(body).then((res) => {
        return res.data;
      });
      if (response.status) {
        navigation.navigate("EntryStrategy", { account: account, tradePlan : response.data });
        console.log(isAgree, accountType);
      }else{
        console.log(response.message);
      }
    }
  };

  return (
    <ScrollView style={styles.baseContainer}>
      <View>
        <Text style={styles.intro}>Set Up Your TradingPlan</Text>
      </View>

      <Text style={[styles.text, { fontStyle: "italic" }]}>
        Every trader is encouraged to have a trading plan. Trading the forex
        market without a trading plan is like driving without any controls
      </Text>
      <Text style={styles.text}>
        Your Trading plan typically has{"  "}
        <Text style={{ fontSize: SIZES.large, color: COLORS.darkyellow }}>
          3
        </Text>
        {"  "}
        components to it.
      </Text>

      <View
        style={{
          paddingVertical: SIZES.large,
          gap: SIZES.small,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: SIZES.small,
          }}
        >
          <View style={styles.asset}>
            <Text
              style={{
                color: COLORS.lightWhite,
                fontSize: SIZES.medium + 2,
                fontFamily: FONT.medium,
                textAlign: "center",
                paddingHorizontal: SIZES.small,
              }}
            >
              Entry Strategy
            </Text>
          </View>

          <View style={styles.asset}>
            <Text
              style={{
                color: COLORS.lightWhite,
                fontSize: SIZES.medium + 2,
                fontFamily: FONT.medium,
                textAlign: "center",
                paddingHorizontal: SIZES.small,
              }}
            >
              Exit Strategies
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: SIZES.small,
          }}
        >
          <View style={styles.asset}>
            <Text
              style={{
                color: COLORS.lightWhite,
                fontSize: SIZES.medium + 2,
                fontFamily: FONT.medium,
                textAlign: "center",
                paddingHorizontal: SIZES.small,
              }}
            >
              Risk Management Rules
            </Text>
          </View>
        </View>
      </View>

      <View style={{ backgroundColor: COLORS.white, height: 0.2 }} />
      <View style={{ marginTop: SIZES.medium }}>
        <View>
          <Text style={styles.intro}>Account Type</Text>
        </View>
        <Options setAccount={setAccount} setAgreed={setAgreement} />
      </View>

      <TouchableOpacity
        onPress={() => {
          //   navigate("AutoTrader");
          // setIsClicked(true);
          continueToRegister();
        }}
        style={styles.button}
      >
        {isClicked ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>

      <View style={{ padding: SIZES.large }}>
        <Text style={styles.text}>
          Don't have a trading plan? Use{" "}
          <Text style={{ color: COLORS.darkyellow, fontSize: SIZES.large }}>
            PsyDTrader
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default SetUpTradingPlan;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  intro: {
    color: COLORS.lightWhite,
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
  options: {
    flexDirection: "row",
    width: "auto",
    padding: SIZES.small,
    borderRadius: 25,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.3,
  },
  text: {
    color: COLORS.lightWhite,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    marginTop: SIZES.small,
  },
  texting: (focused) => ({
    color: focused ? "black" : COLORS.lightWhite,
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    textAlign: "center",
  }),
  image: {
    height: 15,
    width: 15,
    marginLeft: 5,
  },
  checkbox: {
    height: 15,
    width: 15,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    borderRadius: 15,
    marginLeft: 5,
  },
  dots: {
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
  },
  alertContainer: {
    backgroundColor: "black",
  },
  email: (focused) => ({
    borderColor: focused ? COLORS.darkyellow : COLORS.gray,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    height: 60,
    color: COLORS.white,
    fontSize: SIZES.medium,
  }),
  asset: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    borderRadius: SIZES.xSmall,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 30,
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
  accountType: (focused) => ({
    borderRadius: SIZES.small,
    backgroundColor: focused ? COLORS.darkyellow : COLORS.appBackground,
    borderWidth: 0.5,
    borderColor: COLORS.darkyellow,
    width: 90,
    padding: SIZES.small - 3,
  }),
});
