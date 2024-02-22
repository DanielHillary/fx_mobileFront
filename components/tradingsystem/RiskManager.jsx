import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { COLORS, SIZES, FONT } from "../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createRiskRegister } from "../../api/tradingplanApi";
import { AuthContext } from "../../context/AuthContext";

const RiskManager = () => {
  const [lossPerTrade, setLossPerTrade] = useState(0);
  const [lossPerDay, setLossPerDay] = useState(0);
  const [minProfitPerTrade, setMinProfitPerTrade] = useState(0);
  const [minRRR, setMinRRR] = useState(0);
  const [defaultVolume, setDefaultVolume] = useState(0);
  const [targetProfit, setTargetProfit] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [isClicked, setIsClicked] = useState(false);
  const [timing, setTiming] = useState("AM");

  const navigation = useNavigation();

  const { updateCompleted } = useContext(AuthContext);

  const route = useRoute();

  const accountInfo = route.params?.account || null;
  const tradingPlan = route.params?.tradingPlan || null;

  const finishPlanRegistration = async () => {
    const body = {
      accountId: accountInfo.accountId,
      accountNumber: accountInfo.accountNumber,
      allowedLossLevelPercentage: lossPerTrade,
      defaultVolume: defaultVolume,
      maxRiskPercentPerTrade: lossPerTrade,
      minAcceptedScore: 100,
      minProfitPercentPerTrade: minProfitPerTrade,
      riskRewardRatio: minRRR,
      totalPercentRiskPerDay: lossPerDay,
      totalProfitPercentPerDay: targetProfit,
      tradingPlanId: tradingPlan.planId,
      metaApiAccountId: accountInfo.metaApiAccountId,
      userId: accountInfo.userId,
      dailyResetTime: date,
      dayInHour: hours,
      dayInMinute: minutes,
    };

    const response = await createRiskRegister(body).then((res) => {
      return res.data;
    });

    if (response.status) {
      console.log(response.message);
      updateCompleted(true);
      navigation.navigate("SignIn");
    } else {
      console.log(response.message);
    }
  };

  const onChange = (e, selectedDate) => {
    try {
      const amOrPm = selectedDate
        .toLocaleString("en-US", { hour12: true, hour: "numeric" })
        .split(" ")[1];
      setDate(selectedDate);
      setHours(
        selectedDate.getHours().toString() == "0"
          ? "12"
          : selectedDate.getHours().toString()
      );
      setMinutes(
        selectedDate.getMinutes().toString() == "0"
          ? "00"
          : selectedDate.getMinutes().toString()
      );
      setTiming(amOrPm);
      setShowDate(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.baseContainer}>
      <Text style={styles.intro}>Risk Register</Text>
      <Text style={[styles.text, { fontSize: SIZES.medium }]}>
        Your risk register is your check against every trade you take to ensure
        consistency and protection against the sting of the market...
      </Text>

      <View style={styles.infocontainer}>
        <View style={styles.infoEntry}>
          <Text style={{ color: "white", width: 80, fontSize: SIZES.xSmall }}>
            Max loss% per trade
          </Text>

          <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0%"
            keyboardType="numeric"
            numberOfLines={1}
            style={[styles.input]}
            onChangeText={(text) => {
              setLossPerTrade(text);
            }}
            value={lossPerTrade}
          />
          <View style={styles.line} />
        </View>
        <View style={[styles.infoEntry, { marginLeft: 15 }]}>
          <Text style={{ color: "white", width: 80, fontSize: SIZES.xSmall }}>
            Max loss% per day
          </Text>

          <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0%"
            keyboardType="numeric"
            numberOfLines={1}
            style={[styles.input]}
            onChangeText={(num) => {
              setLossPerDay(num);
            }}
            value={lossPerDay}
          />
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.infocontainer}>
        <View style={styles.infoEntry}>
          <Text style={{ color: "white", width: 80, fontSize: SIZES.xSmall }}>
            Minimum RRR
          </Text>

          <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0%"
            keyboardType="numeric"
            numberOfLines={1}
            style={[styles.input]}
            onChangeText={(text) => {
              setMinRRR(text);
            }}
            value={minRRR}
          />
          <View style={styles.line} />
        </View>
        <View style={[styles.infoEntry, { marginLeft: 15 }]}>
          <Text style={{ color: "white", width: 90, fontSize: SIZES.xSmall }}>
            Min profit% per trade
          </Text>

          <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0%"
            numberOfLines={1}
            keyboardType="numeric"
            style={[styles.input]}
            onChangeText={(text) => {
              setMinProfitPerTrade(text);
            }}
            value={minProfitPerTrade}
          />
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.infocontainer}>
        <View style={styles.infoEntry}>
          <Text style={{ color: "white", width: 100, fontSize: SIZES.xSmall }}>
            Default Volume per trade
          </Text>

          <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0"
            keyboardType="numeric"
            numberOfLines={1}
            style={[styles.input]}
            onChangeText={(text) => {
              setDefaultVolume(text);
            }}
            value={defaultVolume}
          />
          <View style={styles.line} />
        </View>

        <View style={styles.infoEntry}>
          <Text style={{ color: "white", width: 80, fontSize: SIZES.xSmall }}>
            Daily profit target
          </Text>

          <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0"
            keyboardType="numeric"
            numberOfLines={1}
            style={[styles.input]}
            onChangeText={(text) => {
              setTargetProfit(text);
            }}
            value={targetProfit}
          />
          <View style={styles.line} />
        </View>
      </View>

      <View style={{ marginTop: SIZES.medium, flexDirection: "row" }}>
        <Text style={[styles.text, { alignSelf: "flex-end", marginBottom: 5 }]}>
          Tell us when your trading day starts:
        </Text>

        <TouchableOpacity
          onPress={() => {
            setShowDate(true);
          }}
        >
          {showDate && (
            <DateTimePicker
              value={date}
              mode="time"
              onChange={onChange}
              is24Hour={false}
            />
          )}

          <View style={styles.time}>
            <Text style={{ color: COLORS.gray, fontSize: SIZES.large }}>
              {`${hours}:${minutes} ${timing}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text
        style={[
          styles.text,
          { marginTop: 30, fontStyle: "italic", color: COLORS.darkyellow },
        ]}
      >
        Please note: If you do not provide a time, the default time would be set
        to 12:00AM of your local time
      </Text>

      <TouchableOpacity
        onPress={() => {
          finishPlanRegistration();
        }}
        style={styles.buttonContinue}
      >
        {isClicked ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Finish</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RiskManager;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  intro: {
    color: COLORS.white,
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.bold,
  },
  time: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    borderRadius: SIZES.xSmall - 3,
    width: 100,
    height: 35,
    marginLeft: SIZES.xSmall - 3,
    marginTop: SIZES.xSmall,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    marginTop: SIZES.small,
  },
  infocontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    width: "auto",
  },
  infoEntry: {
    padding: 15,
    marginTop: 10,
    width: "50%",
    height: 60,
    // borderBottomColor: "#FFF",
  },
  input: {
    width: 120,
    height: 25,
    marginTop: 10,
    color: COLORS.white,
  },
  line: {
    backgroundColor: "white",
    height: 0.4,
    width: "80%",
  },
  buttonContinue: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 200,
    marginTop: 200,
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
