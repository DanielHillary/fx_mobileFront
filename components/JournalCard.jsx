import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Activ,
} from "react-native";
import LinearGradient from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, FONT } from "../constants";

const JournalCard = ({ item }) => {
  const navigation = useNavigation();

  let tradeType = item.tradeType == "BUY INSTANT" ? "buy" : "sell";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("RecordDetails", { data: item });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: SIZES.small, color: COLORS.darkyellow }}>
            {tradeType}
            {/* sell */}
          </Text>
          <Text style={styles.asset(item.assetCategory)}>{item.asset}</Text>
          {/* <Text style={styles.assets}>USD/JPY</Text> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: SIZES.medium - 3,
            alignItems: "center",
          }}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.desc} numberOfLines={1}>
              Entry Price
            </Text>
            <Text style={styles.value}>{item.entryPrice}</Text>
            {/* <Text style={styles.value}>1.34543</Text> */}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.desc} numberOfLines={1}>
              Stop Loss
            </Text>
            <Text style={styles.value}>{item.stopLoss}</Text>
            {/* <Text style={styles.value}>1.2434</Text> */}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.desc} numberOfLines={1}>
              Take Profit
            </Text>
            <Text style={styles.value}>{item.takeProfit}</Text>
            {/* <Text style={styles.value}>1.34444</Text> */}
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          opacity: 0.5,
          width: 280,
          height: 0.5,
          alignSelf: "center",
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.value}>Status: </Text><Text style={styles.status(item.endedInProfit)}>${item.endedInProfit ? item.actualProfitAmount : item.actualLossAmount}</Text>
        </View>
        <View
          style={{
            borderColor: COLORS.darkyellow,
            borderWidth: 0.3,
            borderRadius: 17,
            padding: SIZES.xSmall - 6,
            width: 33.5,
            alignItems: "center",
          }}
        >
          <Text style={styles.score}>{item.tradeScore}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default JournalCard;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 100,
    padding: SIZES.medium - 3,
    backgroundColor: COLORS.componentbackground,
    borderRadius: SIZES.xSmall,
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "center",
    // ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginBottom: 10,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    // width: 'auto',
    justifyContent: "space-between",
    marginTop: SIZES.small,
  },
  asset: (symbol) => ({
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: symbol == "Synthetic" ? SIZES.small : SIZES.medium,
    // fontSize: SIZES.medium
  }),
  assets: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
  },
  date: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.small,
  },
  desc: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.lightWhite,
  },
  value: {
    color: COLORS.darkyellow,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium - 4,
  },
  status: (status) => ({
    color: status ?  "green" : "red",
    fontFamily: FONT.medium,
    fontSize: SIZES.medium - 4,
  }),
  score: {
    color: "green",
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedJob) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});
