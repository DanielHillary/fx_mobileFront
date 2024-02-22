import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import LinearGradient from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import styles from "./activetradecard.style";
import { COLORS, SIZES } from "../../constants";

const ActiveTradeCard = ({ item }) => {
  const navigation = useNavigation();

  let tradeType = item.tradeType == "BUY INSTANT" ? "buy" : "sell";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("Details", { data:item });
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
          </Text>
          <Text style={styles.asset(item.assetCategory)}>{item.asset}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 8,
              width: 8,
              backgroundColor: item.status ? "#32CD32" : "#FF0000",
              borderRadius: 4,
              marginRight: 10,
            }}
          />
          <Text style={styles.date}>{item.open}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
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
    </TouchableOpacity>
  );
};

export default ActiveTradeCard;
