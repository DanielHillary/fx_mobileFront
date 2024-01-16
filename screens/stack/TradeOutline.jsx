import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { loadCustomFont } from "../../components/exits/exitlevelcard.style";
import {
  COLORS,
  SIZES,
  loadThemeCustomFont,
  FONT,
} from "../../constants/theme";
import BottomSlide from "../../components/BottomSlide";
import { useRoute } from "@react-navigation/native";
import { getResponseRemarks } from "../../api/tradeAnalysisApi";


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
            Warning: This trade defiles your trading plan!
          </Text>
        )}
      </View>
      <View style={{marginBottom: 100}}>
        {status ? (
          <Text style={[styles.text, { marginHorizontal: 10 }]}>
            We analyzed the parameters you provided against your trading plan
            and it looks all good
          </Text>
        ) : (
          <View style={{rowGap: SIZES.medium, marginBottom: 5}}>
            {remarks?.map((item) => (
              <Text key={item.id} style={[styles.text, { marginHorizontal: 30 }]}>{item.remark}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const TradeOutline = () => {
  const [note, setNote] = useState("Add note");
  const [editMode, setEditMode] = useState(false);
  const [remarks, setRemarks] = useState([]);

  useEffect(() => {
    loadCustomFont();
    loadThemeCustomFont();
  }, []);

  const tradeId = "8003943049";
  const percent = "12%";

  const route = useRoute();

  const details = route.params.data;

  const tradeType = details.tradeType == "BUY INSTANT" ? "buy" : "sell";

  const inputRef = useRef(null);

  const getRemarks = async () => {
    const response = await getResponseRemarks(details.responseId).then(
      (res) => {
        return res.data;
      }
    );
    if (response.status) {
      setRemarks(response.data);
      console.log(response.data);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    getRemarks();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              color: COLORS.lightWhite,
              fontFamily: FONT.medium,
              fontSize: SIZES.medium,
              marginBottom: 10,
            }}
          >
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
                <Text style={[styles.info, { marginLeft: 55 }]}>Open Date</Text>
                <Text style={[styles.infodetail, { marginLeft: 55 }]}>
                  {details.entryDate}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={styles.note}>Trade Notes</Text>
            <View style={styles.commentContainer}>
              <View>
                {editMode ? (
                  <TextInput
                    ref={inputRef}
                    editable={true}
                    placeholder="Add a note to your trade"
                    placeholderTextColor={"gray"}
                    numberOfLines={4}
                    style={[styles.input, { marginTop: 4 }]}
                    onChangeText={(text) => {
                      setNote(text);
                    }}
                    value={note}
                    selection={{
                      start: note.length,
                      end: note.length,
                    }}
                  />
                ) : (
                  <Text style={styles.input}>{note}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={() => {
                  setEditMode(!editMode);
                  inputRef.current?.focus();
                }}
                style={{ width: 40, alignSelf: "flex-end" }}
              >
                <Image
                  source={require("../../assets/icons/EditFirst.png")}
                  resizeMode="cover"
                  style={styles.logImage}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Remark
            status={!details.isProtected}
            remarks={remarks}
          />
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
  headingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    padding: 15,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    color: COLORS.white,
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    marginTop: SIZES.small,
    // padding: SIZES.medium,
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
  remarks: {
    backgroundColor: "#111",
    alignContent: "flex-start",
    flexDirection: "row",
    borderRadius: 10,
    padding: 5,
    height: 50,
    width: 220,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5
  },
  input: {
    marginTop: 10,
    color: COLORS.white,
    justifyContent: "flex-start",
    height: 20,
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
  note: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    paddingLeft: 15,
    paddingBottom: 5,
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    height: 20,
    width: 30,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  logImage: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
});

export default TradeOutline;
