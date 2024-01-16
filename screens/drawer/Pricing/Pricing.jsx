import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, FONT } from "../../../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Bronze from "./Bronze";
import Gold from "./Gold";
import Diamond from "./Diamond";

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
      <TopTab.Screen name="Bronze" component={Bronze} options={{}} />
      <TopTab.Screen name="Gold" component={Gold} />
      <TopTab.Screen name="Diamond" component={Diamond} />
    </TopTab.Navigator>
  );
};

const Pricing = () => {
  const [isRegular, setIsRegular] = useState(true);
  const [regular, setRegular] = useState(true);
  const [strict, setStrict] = useState(false);

  return (
    <View style={styles.base}>
      {/* <View style={{ marginBottom: SIZES.medium }}>
        <Text style={styles.baseText}>Pricing</Text>
      </View> */}
      <TopTabGroup />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setIsRegular(true), setRegular(true), setStrict(false);
          }}
        >
          <Text style={styles.text}>Make Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pricing;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  tabBar:{
    backgroundColor: COLORS.appBackground,
  },
  baseText: {
    color: COLORS.lightWhite,
    padding: 5,
    marginHorizontal: 15,
    fontSize: SIZES.large + 5,
    fontWeight: "500",
  },
  buttonStyle: {
    backgroundColor: COLORS.darkyellow,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    width: 300,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.small,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.large,
    marginTop: SIZES.small,
    gap: SIZES.medium,
  },
  text: {
    color: "black",
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
});
