import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONT, SIZES } from "../../../constants";

const Details = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: SIZES.small,
        alignItems: "center",
        padding: SIZES.xSmall,
        marginTop: SIZES.small - 2,
      }}
    >
      <Image
        source={
          item.stat
            ? require("../../../assets/icons/goodie.png")
            : require("../../../assets/icons/wrong.png")
        }
        style={{ height: 10, width: 10 }}
      />
      <Text style={styles.text}>{item.detail}</Text>
    </View>
  );
};
const Bronze = () => {
  const data = [
    {
      id: 1,
      stat: true,
      detail: "Risk Analyzer",
    },
    {
      id: 2,
      stat: true,
      detail: "PsyDTrader Trade Appraisal",
    },
    {
      id: 3,
      stat: true,
      detail: "Open Multiple Trades for multiple accounts",
    },
    {
      id: 4,
      stat: true,
      detail: "Alert medium: Push Notification, email",
    },
    {
      id: 5,
      stat: true,
      detail: "Monthly account reporting",
    },
    {
      id: 6,
      stat: true,
      detail: "Automatic Trade journaling",
    },
    {
      id: 7,
      stat: true,
      detail: "Limited alerts on all asset (50/month)",
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.price}>$10/Month</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Details item={item} />}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{ columnGap: SIZES.small - 5 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Bronze;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    padding: SIZES.small,
    paddingTop: SIZES.large,
  },
  price: {
    alignSelf: "center",
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.large * 1.5,
  },
  listContainer: {},
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.regular,
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 5,
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
