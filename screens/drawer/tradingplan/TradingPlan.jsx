import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, SIZES, FONT } from "../../../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EntryPlan from "./EntryPlan";
import ExitPlan from "./ExitPlan";
import RiskRegister from "./RiskRegister";
import NoTradePlan from "./NoTradePlan";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TopTab = createMaterialTopTabNavigator();

const TopTabGroup = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.darkyellow,
          borderRadius: 10,
        },
        tabBarActiveTintColor: COLORS.darkyellow,
        tabBarInactiveTintColor: COLORS.gray,
      }}
    >
      <TopTab.Screen name="EntryPlan" component={EntryPlan} options={{}} />
      <TopTab.Screen name="ExitPlan" component={ExitPlan} />
      <TopTab.Screen name="RiskRegister" component={RiskRegister} />
    </TopTab.Navigator>
  );
};

const TradingPlan = () => {
  const [isRegular, setIsRegular] = useState(true);
  const [regular, setRegular] = useState(true);
  const [strict, setStrict] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});

  const getAccount = async () => {
    const account = await AsyncStorage.getItem("accountInfo").then((res) => {
      return JSON.parse(res);
    });
    setAccountInfo(account);
    console.log(account.hasCompleteTradingPlan);
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <View style={styles.base}>
      {accountInfo.completionStatus != 25 ||
      accountInfo.completionStatus != 0 ? (
        <TopTabGroup />
      ) : (
        <NoTradePlan accountInfo={accountInfo} />
      )}
      <View style={styles.buttonContainer}></View>
    </View>
  );
};

export default TradingPlan;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  tabBar: {
    backgroundColor: COLORS.appBackground,
  },
  baseText: {
    color: COLORS.lightWhite,
    padding: 5,
    marginHorizontal: 15,
    fontSize: SIZES.large + 5,
    fontWeight: "500",
  },
  buttonStyle: (control) => ({
    backgroundColor: control ? COLORS.darkyellow : COLORS.appBackground,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    width: 150,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.small,
  }),
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.large,
    marginTop: SIZES.small,
    gap: SIZES.medium,
  },
  text: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
  },
});
