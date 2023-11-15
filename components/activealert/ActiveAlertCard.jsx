import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import LinearGradient from "react-native-linear-gradient";

import styles from "./activealertcard.style";

let iconName = "cash-outline";

const ActiveAlertCard = ({ item, handleCardPress }) => {
  return (
    // <LinearGradient
    //   colors={[ "rgba(184, 159, 27, 0.2)", "rgba(184, 159, 27, 0.03"]}
    // >
    <TouchableOpacity style={{ backgroundColor: COLORS.componentbackground, borderRadius: SIZES.medium }} onPress={() => handleCardPress()}>
      <View
        style={styles.container}
        
      >
        <View style={{flexDirection: 'row', alignItems: 'center', gap: SIZES.xSmall}}>
          <TouchableOpacity style={styles.logoContainer}>
            <Image
              source={require("../../assets/icons/dollar.png")}
              resizeMode="cover"
              style={styles.logoImage}
            />

            {/* <Ionicons name={iconName} size={24} color={COLORS.darkyellow} /> */}
          </TouchableOpacity>
          <Text style={styles.assetName} numberOfLines={1}>
            {item.symbol}
            {/* USD/CAD */}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.position} numberOfLines={1}>
            {item.position}
            {/* Below */}
          </Text>
          <Text style={styles.alertprice}>
            ${item.watchPrice}
            {/* 23443.76 */}
          </Text>
        </View>
      </View>
      <View style={{ padding: SIZES.large }}>
        <Text style={styles.position} numberOfLines={1}>
          Last price: ${item.watchPrice}
          {/* Resistance zone */}
        </Text>
        <Text style={styles.broker}>
          {item.symbolCategory}
          {/* Currencies */}
        </Text>
      </View>
    </TouchableOpacity>
    // {/* </LinearGradient> */}
  );
};

export default ActiveAlertCard;
