import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

const Remark = ({ status, hasTradingPlan, remarks }) => {
  return (
    <View>
      <View style={styles.remarks}>
        <Image
          source={
            status
              ? require("../../assets/icons/good.png")
              : require("../../assets/icons/badmark.png")
          }
          resizeMode="contain"
          style={styles.image}
        />
        {status ? (
          <Text
            style={[
              styles.text,
              {
                marginTop: 12,
                fontSize: SIZES.medium,
                marginLeft: 5,
              },
            ]}
          >
            This is a good trade
          </Text>
        ) : (
          <Text
            style={[
              styles.text,
              {
                marginTop: 7,
                marginLeft: 7,
                fontSize: SIZES.small,
                textAlign: "left",
                width: 180,
              },
            ]}
          >
            Warning: This trade violates some aspects of your trading plan!
          </Text>
        )}
      </View>
      <View style={{marginBottom: 40}}>
        {status ? (
          <Text style={[styles.text, { marginHorizontal: 30 }]}>
            We analyzed the parameters you provided against your trading plan
            and it looks all good
          </Text>
        ) : (
          <View style={{rowGap: SIZES.medium, marginBottom: 5}}>
            {remarks?.map((item) => (
              <Text key={item.remark} style={[styles.text, { marginHorizontal: 30 }]}>{item.remark}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};
const RiskAnalysis = () => {

  const [remarks, setRemarks] = useState([]);

  const { navigate } = useNavigation();

  const route = useRoute();

  const tradeDetails = route.params?.data || null;

  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const getRemarks = async () => {
    setRemarks(tradeDetails.rems);
  };

  useEffect(() => {
    getRemarks();
  }, []);

  return (
    <ScrollView style={styles.baseContainer}>
      <View
        style={{
          flexDirection: "row",
          // columnGap: 5,
          marginHorizontal: 10,
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: SIZES.small - 6 }}>
          <Text style={styles.buy}>{tradeDetails.tradeType}</Text>
          <Text style={[styles.text, { fontSize: SIZES.xLarge + 2 }]}>
            {tradeDetails.asset}
          </Text>
        </View>
      </View>
      <View>
        <View style={[styles.headingInfo, { marginTop: 0 }]}>
          <View>
            <Text style={styles.info}>Entry Price</Text>
            <Text style={styles.infodetail}>{tradeDetails.entryPrice}</Text>
          </View>

          <View>
            <Text style={styles.info}>Stop Loss</Text>
            <Text style={[styles.infodetail, { textAlign: "right" }]}>
              {tradeDetails.stopLossPrice}
            </Text>
          </View>
        </View>

        <View style={styles.headingInfo}>
          <View>
            <Text style={styles.info}>Volume</Text>
            <Text style={styles.infodetail}>{tradeDetails.lotSize}</Text>
          </View>

          <View>
            <Text style={styles.info}>Take Profit</Text>
            <Text style={[styles.infodetail, { textAlign: "right" }]}>
              {tradeDetails.takeProfitPrice}
            </Text>
          </View>
        </View>

        <View style={styles.headingInfo}>
          <View>
            <Text style={styles.info}>Risk Percent</Text>
            <Text style={styles.infodetail}>
              {tradeDetails.percentageLoss}%
            </Text>
          </View>

          <View>
            <Text style={[styles.info]}>Profit percent</Text>
            <Text style={[styles.infodetail, { textAlign: "right" }]}>
              {tradeDetails.percentageProfit}%
            </Text>
          </View>
        </View>

        <View style={[styles.headingInfo, { marginTop: 0 }]}>
          <View>
            <Text style={styles.info}>Risk Amount</Text>
            <Text style={styles.infodetail}>${tradeDetails.lossAmount}</Text>
          </View>

          <View>
            <Text style={styles.info}>Reward Amt</Text>
            <Text style={[styles.infodetail, { textAlign: "right" }]}>
              ${tradeDetails.profitAmount}
            </Text>
          </View>
        </View>

        <View style={styles.headingInfo}>
          <View>
            <Text style={styles.info}>RRR</Text>
            <Text style={styles.infodetail}>
              1:{tradeDetails.riskRewardRatio}
            </Text>
          </View>

          <View>
            <Text style={styles.info}>Recom. Volume</Text>
            <Text style={[styles.infodetail, { textAlign: "right" }]}>
              {tradeDetails.recommendedLotSize}
            </Text>
          </View>
        </View>

        <View style={styles.headingInfo}>
          <View>
            <Text style={styles.info}>
              Account balance:{" "}
              <Text
                style={{
                  marginHorizontal: 30,
                  color: COLORS.darkyellow,
                  fontFamily: FONT.bold,
                  fontSize: SIZES.large,
                }}
              >
                {formatter.format(tradeDetails.accountBalance)}
              </Text>
            </Text>
          </View>
        </View>

        <Remark
          status={tradeDetails.goodTrade}
          hasTradingPlan={tradeDetails.hasTradingPlan}
          remarks={remarks}
        />

        {/* <Text style={styles.tradeID}>Profitability: High</Text> */}

        <TouchableOpacity
          onPress={() => {
            navigate("AutoTrader", { data: tradeDetails });
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Execute this trade</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RiskAnalysis;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: "#111",
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
  tradeID: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
    marginLeft: 30,
    marginTop: 10,
  },
  headingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    padding: 15,
    marginTop: 10,
    paddingHorizontal: 45,
  },
  info: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    fontWeight: "300",
    textAlign: "justify",
  },
  infodetail: {
    color: COLORS.darkyellow,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginTop: 5,
    textAlign: "justify",
    fontWeight: "bold",
  },
  remarks: {
    backgroundColor: "#111",
    alignContent: "flex-start",
    flexDirection: "row",
    borderRadius: 10,
    padding: 5,
    height: 50,
    width: 220,
    alignSelf: "flex-start",
    margin: 10,
    marginLeft: 30,
    borderColor: COLORS.darkyellow,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  image: {
    height: 20,
    width: 30,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 30,
    marginBottom: 40,
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
