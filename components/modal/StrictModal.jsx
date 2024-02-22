import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { COLORS, SIZES, FONT } from "../../constants";
import React, { useEffect, useState } from "react";

const StrictModal = ({ setVisibility, updateSigned, updateAccount, account }) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setIsPressed(account.hasSignedStrictAgreement);
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <ScrollView style={styles.base}>
          <Text
            style={[
              styles.text,
              {
                fontSize: SIZES.large,
                alignSelf: "center",
                marginBottom: SIZES.xSmall,
              },
            ]}
          >
            Strict Agreement
          </Text>
          <Text style={styles.text}>
            Hello, please note that if you switch your account to strict mode,
            you are authorizing us to carry out the following actions on your
            account.
          </Text>
          <Text style={styles.subtext}>
            1. Automatically close a trade when it doesn't fit with your trading
            plan
          </Text>
          <Text style={styles.subtext}>
            2. Adjust your stop levels to always meet your risk/reward ration
            per trade
          </Text>
          <Text style={styles.text}>
            Therefore, you might lose money due to broker spread or market volatility
            everytime you open a trade and we have to shut it down. Also your stop levels
            might not be the exact prices as set when purchasing your positions.
          </Text>
        </ScrollView>
        {!account.hasSignedStrictAgreement && <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 80,
          }}
        >
          <TouchableOpacity
            onPress={() => {
                setIsPressed(!isPressed)
                
            }}
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              {isPressed ? (
                <Image
                  source={require("../../assets/icons/checkbox.png")}
                  resizeMethod="scale"
                  style={styles.image}
                />
              ) : (
                <View style={styles.checkbox} />
              )}
            </View>

            <View style={{ marginTop: 3 }}>
              <Text
                style={[styles.text, { marginLeft: 10, fontSize: SIZES.small }]}
              >
                I have read and agree to the terms and conditions above.
              </Text>
            </View>
          </TouchableOpacity>
        </View>}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: SIZES.medium * 2,
            paddingHorizontal: SIZES.medium * 1.5,
            position: "absolute",
            bottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              updateSigned(false);
              setVisibility(false);
            }}
            style={styles.button}
          >
            <Text style={styles.buttontext}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            
            onPress={() => {
              if(!isPressed){
                Alert.alert("","Please tick the agreement box to enable this feature");
              }else{
                updateAccount(true);
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttontextCont(isPressed)}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StrictModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    height: 15,
    width: 15,
    marginLeft: 5,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.small + 1,
    fontFamily: FONT.regular,
  },
  subtext: {
    color: COLORS.white,
    fontSize: SIZES.small + 1,
    fontFamily: FONT.regular,
    margin: SIZES.small,
  },
  optionText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    margin: SIZES.small,
  },
  note: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginTop: SIZES.medium,
  },
  checkbox: {
    height: 15,
    width: 15,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    borderRadius: 15,
    marginLeft: 5,
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
  buttontextCont: (isAgreed) => ({
    color: isAgreed ? "black" : COLORS.gray2,
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    alignSelf: "center",
    margin: SIZES.small - 3
  }),
  buttontext: {
    color: "black",
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    alignSelf: "center",
    margin: SIZES.small - 3
  },
  modal: {
    backgroundColor: "#09181C",
    height: 400,
    width: "100%",
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  choose: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    width: 200,
    alignSelf: "flex-start",
    marginLeft: SIZES.medium,
  },
});
