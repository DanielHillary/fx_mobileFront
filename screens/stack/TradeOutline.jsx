import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { loadCustomFont } from "../../components/exits/exitlevelcard.style";
import { COLORS, SIZES, loadThemeCustomFont } from "../../constants/theme";
import BottomSlide from "../../components/BottomSlide";
import { useRoute } from "@react-navigation/native";

const TradeOutline = () => {
  useEffect(() => {
    loadCustomFont();
    loadThemeCustomFont();
  }, []);

  const tradeId = "8003943049";
  const percent = "12%";

  const route = useRoute();

  const details = route.params.data;

  const tradeType = details.tradeType == "BUY INSTANT" ? "buy" : "sell";

  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={{ color: COLORS.lightWhite }}>
            Trade ID: {details.metaTradeOrderId || tradeId}
          </Text>
        </View>

        <View style={styles.heading}>
          <Text
            style={{
              color: "white",
              fontSize:
                details.assetCategory == "Synthetic"
                  ? SIZES.medium
                  : SIZES.large,
              fontWeight: "600",
            }}
          >
            {details.asset}
          </Text>
          <View>
            <Text style={styles.info}>Trade Type</Text>
            <Text style={styles.infodetail}>{tradeType}</Text>
          </View>
          <Text style={{ color: "white" }}>12 June 2023</Text>
        </View>
        <ScrollView style={styles.infoContainer}>
          <View>
            <View style={[styles.headingInfo, { marginTop: 0 }]}>
              <View>
                <Text style={styles.info}>Entry Price</Text>
                <Text style={styles.infodetail}>{details.entryPrice}</Text>
              </View>

              <View>
                <Text style={styles.info}>Stop Loss</Text>
                <Text style={styles.infodetail}>{details.stopLoss}</Text>
              </View>

              <View>
                <Text style={styles.info}>Take profit</Text>
                <Text style={styles.infodetail}>{details.takeProfit}</Text>
              </View>
            </View>

            <View style={styles.headingInfo}>
              <View>
                <Text style={styles.info}>Risk Percent</Text>
                <Text style={styles.infodetail}>{details.percentageLoss}%</Text>
              </View>

              <View>
                <Text style={styles.info}>Volume/Lot</Text>
                <Text style={styles.infodetail}>{details.lotSize}</Text>
              </View>

              <View>
                <Text style={styles.info}>Risk Ratio</Text>
                <Text style={styles.infodetail}>1:{details.riskRewardRatio}</Text>
              </View>
            </View>

            <View style={styles.headingInfo}>
              <View>
                <Text style={styles.info}>Profit Percent</Text>
                <Text style={styles.infodetail}>{details.percentageProfit}%</Text>
              </View>

              <View>
                <Text style={styles.info}>Risk Amount</Text>
                <Text style={styles.infodetail}>${details.amountLoss}</Text>
              </View>

              <View>
                <Text style={styles.info}>Reward Amt</Text>
                <Text style={styles.infodetail}>${details.amountProfit}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "60%",
                padding: 15,
                marginRight: 80,
              }}
            >
              <View>
                <Text style={styles.info}>Opening bal</Text>
                <Text style={styles.infodetail}>{details.openingBalance}</Text>
              </View>

              <View>
                <Text style={[styles.info, {marginLeft: 55}]}>Closing balance</Text>
                <Text style={[styles.infodetail, {marginLeft: 55}]}>{details.closingBalance}</Text>
              </View>

              <View>
                <Text style={[styles.info, {marginLeft: 30}]}>Duration</Text>
                <Text style={[styles.infodetail, {marginLeft: 30}]}>1:00hr</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.note}>Trade Notes</Text>
            <View style={styles.commentContainer}>
              <Text style={{ color: COLORS.lightWhite, padding: 2 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </Text>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/icons/EditFirst.png")}
                  resizeMode="cover"
                  style={styles.logImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: "orange",
    opacity: 0.6,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  headingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    padding: 15,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  assets: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    // alignItems: 'center',
    width: "95%",
    backgroundColor: "#1a1918",
    borderRadius: SIZES.xSmall,
  },
  info: {
    color: "white",
    fontSize: SIZES.medium - 2,
    fontWeight: "300",
  },
  infodetail: {
    color: COLORS.darkyellow,
    marginTop: 5,
    fontSize: SIZES.medium,
    textAlign: "left",
    fontWeight: "bold",
  },
  commentContainer: {
    width: "90%",
    height: 140,
    padding: SIZES.medium - 5,
    backgroundColor: "#111",
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    justifyContent: "flex-start",
    alignSelf: "center",
    // ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  note: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    paddingLeft: 15,
    paddingBottom: 5,
    marginLeft: 10,
    marginTop: 10,
  },
  logImage: {
    width: "10%",
    height: "40%",
    borderRadius: 10,
    marginTop: 28,
    alignSelf: "flex-end",
  },
});

export default TradeOutline;
