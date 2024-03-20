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
import {
  COLORS,
  FONT,
  SIZES,
  loadThemeCustomFont,
} from "../../constants/theme";
import { useRoute } from "@react-navigation/native";
import { getTradeNotes } from "../../api/journalApi";

const RecordOutline = ({ notes }) => {
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
          <Text style={{ color: COLORS.lightWhite, marginBottom: SIZES.large }}>
            Trade ID: {details.metaTradeOrderId || tradeId}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            // columnGap: 5,
            marginHorizontal: 10,
            marginBottom: 10,
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: SIZES.small - 6 }}>
            <Text style={styles.buy}>
              {details.tradeType == "BUY INSTANT" ? "BUY" : "SELL"}
            </Text>
            <Text style={[styles.text, { fontSize: SIZES.xLarge + 2 }]}>
              {details.asset}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignContent: 'center', gap: SIZES.xxLarge }}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Text style={styles.text}>Open: </Text>
            <View>
              <Text style={styles.time}>{details.open}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Text style={styles.text}>Close:</Text>
            <View>
              <Text style={styles.time}> {details.close}</Text>
            </View>
          </View>
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
                <Text style={styles.infodetail}>
                  1:{details.riskRewardRatio}
                </Text>
              </View>
            </View>

            <View style={styles.headingInfo}>
              <View>
                <Text style={styles.info}>Profit Percent</Text>
                <Text style={styles.infodetail}>
                  {details.percentageProfit}%
                </Text>
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
                <Text style={[styles.info, { marginLeft: 55 }]}>
                  Closing balance
                </Text>
                <Text style={[styles.infodetail, { marginLeft: 55 }]}>
                  {details.closingBalance}
                </Text>
              </View>

              <View>
                <Text style={[styles.info, { marginLeft: 30 }]}>Duration</Text>
                <Text style={[styles.infodetail, { marginLeft: 30 }]}>
                  {details.tradeDuration} {details.tradeInMinutes ? "mins" : details.tradeInSeconds ? "sec" : "hrs"}
                </Text>
              </View>
            </View>

            <View style={styles.headingInfo}>
              <View>
                <Text style={styles.info}>Actual % P/L</Text>
                <Text style={styles.infodetails(details.endedInProfit)}>
                  {details.endedInProfit
                    ? details.actualPercentProfit
                    : details.actualPercentLoss}
                  %
                </Text>
              </View>

              <View>
                <Text style={styles.info}>Actual Loss</Text>
                <Text style={styles.infodetail}>
                  ${details.actualLossAmount}
                </Text>
              </View>

              <View>
                <Text style={styles.info}>Actual profit</Text>
                <Text style={styles.infodetail}>
                  ${details.actualProfitAmount}
                </Text>
              </View>
            </View>

            <View style={styles.headingInfo}>
              <View>
                <View>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONT.bold,
                      fontSize: SIZES.xxLarge,
                    }}
                  >
                    {details.tradeScore}%
                  </Text>
                </View>
                <Text style={styles.info}>PsyD Score</Text>
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: SIZES.large }}>
            <Text style={styles.note}>Trade Notes</Text>
            <View style={styles.commentContainer}>
              <Text style={{ color: COLORS.lightWhite, padding: 2 }}>
                {notes}
              </Text>
              {/* <TouchableOpacity>
                <Image
                  source={require("../../assets/icons/EditFirst.png")}
                  resizeMode="cover"
                  style={styles.logImage}
                />
              </TouchableOpacity> */}
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
    backgroundColor: COLORS.appBackground,
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
  time: {
    color: COLORS.darkyellow,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
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
    backgroundColor: COLORS.appBackground,
    borderRadius: SIZES.xSmall,
    marginBottom: 90,
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
  infodetails: (status) => ({
    color: status ? "green" : "red",
    marginTop: 5,
    fontSize: SIZES.medium,
    textAlign: "left",
    fontWeight: "bold",
  }),
  commentContainer: {
    width: "90%",
    height: "auto",
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
  buy: {
    fontFamily: FONT.bold,
    alignSelf: "flex-start",
    color: COLORS.darkyellow,
    height: 20,
    fontSize: SIZES.small - 3,
    marginTop: 15,
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
  },
  note: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    alignSelf: "center",
    padding: SIZES.small,
  },
  logImage: {
    width: "10%",
    height: "40%",
    borderRadius: 10,
    marginTop: 28,
    alignSelf: "flex-end",
  },
});

export default RecordOutline;
