import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
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
const Diamond = () => {
  const data = [
    {
      stat: true,
      detail: "Unlimited price alerts",
    },
    {
      stat: true,
      detail: "Alert options: Calls, SMS",
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.price}>$20/Month</Text>
      </View>

      <View style={{marginTop: SIZES.medium, margin: SIZES.small}}>
        <Text style={styles.plus}>Everything from Gold package Plus...</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Details item={item} />}
        keyExtractor={(item) => item?.detail}
        contentContainerStyle={{ columnGap: SIZES.small - 5 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Diamond;

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
    marginTop: 6,
    alignSelf: "center",
  },
  plus: {
    color: COLORS.darkyellow,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    fontStyle: 'italic'
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
