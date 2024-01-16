import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import { COLORS, SIZES, FONT } from "../../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import { AuthContext } from "../../../context/AuthContext";
import { getRiskManager } from "../../../api/tradingplanApi";

const AlertModal = ({
  title,
  isAlert,
  handleConfirm,
  handleCancel,
  showCancelButton,
  showConfirmButton,
  message,
}) => {
  return (
    <View>
      <AwesomeAlert
        show={isAlert}
        title={title}
        titleStyle={styles.title}
        contentContainerStyle={styles.alertContainer}
        showConfirmButton={showConfirmButton}
        showCancelButton={showCancelButton}
        cancelButtonColor={COLORS.darkyellow}
        cancelButtonTextStyle={styles.alertText}
        cancelText="Review"
        confirmButtonColor={COLORS.darkyellow}
        confirmButtonTextStyle={styles.alertText}
        confirmText="Save"
        onCancelPressed={handleCancel}
        onConfirmPressed={handleConfirm}
        closeOnTouchOutside={true}
        // onDismiss={handleCancel}
        message={message}
        messageStyle={styles.alertMessage}
      />
    </View>
  );
};

const RiskRegister = () => {
  const [lossPerTrade, setLossPerTrade] = useState("");
  const [lossPerDay, setLossPerDay] = useState("");
  const [minProfitPerTrade, setMinProfitPerTrade] = useState("");
  const [minRRR, setMinRRR] = useState("");
  const [defaultVolume, setDefaultVolume] = useState("");
  const [targetProfit, setTargetProfit] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [isClicked, setIsClicked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [checkAlert, setCheckAlert] = useState(false);
  const [riskManager, setRiskManager] = useState({}); 

  const navigation = useNavigation();

  const { accountDetails } = useContext(AuthContext);

  const getRiskRegister = async() => {
    const response = await getRiskManager(accountDetails.planId).then((res) => {
      return res.data;
    })
    if(response.status){
      setRiskManager(response.data);
    }else {
      console.log(response.message);
    }
  }

  useEffect(() => {
    getRiskRegister()
  }, []);

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setHours(date.getHours().toString());
    setMinutes(date.getMinutes().toString());
    setShowDate(false);
  };

  const inputRef = useRef(null);

  const handleSave = () => {
    const body = {
      accountId: accountDetails.accountId,
      accountNumber: accountDetails.accountNumber,
      allowedLossLevelPercentage: lossPerTrade == "" ? riskManager.allowedLossLevelPercentage : lossPerTrade,
      defaultVolume: defaultVolume == "" ? riskManager.defaultVolume : defaultVolume,
      maxRiskPercentPerTrade: lossPerTrade == "" ? riskManager.allowedLossLevelPercentage : lossPerTrade,
      minAcceptedScore: 100,
      minProfitPercentPerTrade: minProfitPerTrade == "" ? riskManager.minProfitPercentPerTrade : minProfitPerTrade,
      riskRewardRatio: minRRR == "" ? riskManager.riskRewardRatio : minRRR,
      totalPercentRiskPerDay: lossPerDay == "" ? riskManager.totalPercentRiskPerDay : lossPerDay,
      totalProfitPercentPerDay: targetProfit == "" ? riskManager.totalProfitPercentPerDay : targetProfit,
      tradingPlanId: accountDetails.planId,
      metaApiAccountId: accountDetails.metaApiAccountId,
      userId: accountDetails.userId,
    };

    setLossPerTrade(body.allowedLossLevelPercentage);
    setLossPerDay(body.totalPercentRiskPerDay);
    setMinRRR(body.riskRewardRatio);
    setMinProfitPerTrade(body.minProfitPercentPerTrade);
    setTargetProfit(body.totalProfitPercentPerDay);
    setDefaultVolume(body.defaultVolume);

    console.log("save risk register");
  }

  return (
    <View style={styles.baseContainer}>
      <Text style={styles.intro}>Risk Register</Text>
      <Text style={[styles.text, { fontSize: SIZES.medium }]}>
        Your risk register is your check against every trade you take to ensure
        consistency and protection against the sting of the market.
      </Text>

      <View style={styles.infocontainer}>
        <View style={styles.infoEntry}>
          <Text style={{ color: "white", width: 120, fontSize: SIZES.medium -3 }}>
            Max loss% per trade
          </Text>

          {editMode ? (
            <TextInput
              ref={inputRef}
              placeholderTextColor={"gray"}
              placeholder="0.0%"
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => {
                setLossPerTrade(text);
              }}
              value={lossPerTrade}
              selection={{
                start: lossPerTrade.length,
                end: lossPerTrade.length,
              }}
            />
          ) : (
            <Text style={styles.textInput}>{riskManager.maxRiskPercentPerTrade}%</Text>
          )}
          <View style={styles.line(editMode)} />
        </View>

        <View style={[styles.infoEntry, { marginLeft: 15 }]}>
          <Text style={{ color: "white", width: 120, fontSize: SIZES.medium -3 }}>
            Max loss% per day
          </Text>

          {editMode ? <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0%"
            keyboardType="numeric"
            numberOfLines={1}
            style={[styles.input]}
            onChangeText={(num) => {
              setLossPerDay(num);
            }}
            value={lossPerDay}
            selection={{
              start: lossPerDay.length,
              end: lossPerDay.length,
            }}
          /> : <Text style={styles.textInput}>{riskManager.totalPercentRiskPerDay}%</Text>}
          <View style={styles.line(editMode)} />
        </View>
      </View>

      <View style={styles.infocontainer}>
        <View style={styles.infoEntry}>
          <Text style={{ color: "white", width: 80, fontSize: SIZES.medium -3 }}>
            Minimum RRR
          </Text>

          {editMode ? <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0%"
            keyboardType="numeric"
            numberOfLines={1}
            style={[styles.input]}
            onChangeText={(text) => {
              setMinRRR(text);
            }}
            value={minRRR}
            selection={{
              start: minRRR.length,
              end: minRRR.length,
            }}
          /> : <Text style={styles.textInput}>{riskManager.riskRewardRatio}</Text>}
          <View style={styles.line(editMode)} />
        </View>
        <View style={[styles.infoEntry, { marginLeft: 15 }]}>
          <Text style={{ color: "white", width: 120, fontSize: SIZES.medium -3 }}>
            Min profit% per trade
          </Text>

          {editMode ? <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0%"
            numberOfLines={1}
            keyboardType="numeric"
            style={[styles.input]}
            onChangeText={(text) => {
              setMinProfitPerTrade(text);
            }}
            value={minProfitPerTrade}
            selection={{
              start: minProfitPerTrade.length,
              end: minProfitPerTrade.length,
            }}
          /> : <Text style={styles.textInput}>{riskManager.minProfitPercentPerTrade}%</Text>}
          <View style={styles.line(editMode)} />
        </View>
      </View>

      <View style={styles.infocontainer}>
        <View style={styles.infoEntry}>
          <Text style={{ color: "white", width: 120, fontSize: SIZES.medium -3 }}>
            Default Vol. per trade
          </Text>

          {editMode ? <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0"
            keyboardType="numeric"
            numberOfLines={1}
            style={[styles.input]}
            onChangeText={(text) => {
              setDefaultVolume(text);
            }}
            value={defaultVolume}
            selection={{
              start: defaultVolume.length,
              end: defaultVolume.length,
            }}
          /> : <Text style={styles.textInput}>{riskManager.defaultVolume}</Text>}
          <View style={styles.line(editMode)} />
        </View>

        <View style={[styles.infoEntry, { marginLeft: 15 }]}>
          <Text style={{ color: "white", width: 100, fontSize: SIZES.medium -3 }}>
            Daily profit target
          </Text>

          {editMode ? <TextInput
            placeholderTextColor={"gray"}
            placeholder="0.0"
            keyboardType="numeric"
            numberOfLines={1}
            style={[styles.input]}
            onChangeText={(text) => {
              setTargetProfit(text);
            }}
            value={targetProfit}
            selection={{
              start: targetProfit.length,
              end: targetProfit.length,
            }}
          /> : <Text style={styles.textInput}>{riskManager.totalProfitPercentPerDay}%</Text>}
          <View style={styles.line(editMode)} />
        </View>
      </View>

      <View style={{ marginTop: SIZES.xxLarge + 5, flexDirection: "row" }}>
        <Text style={[styles.text, { alignSelf: "flex-end", marginBottom: 5 }]}>
          Your daily reset time:
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
              is24Hour={true}
            />
          )}

          <View style={styles.time}>
            <Text style={{ color: COLORS.gray, fontSize: SIZES.large }}>
              {`${hours}:${minutes} AM`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <AlertModal
        message={
          "Are you sure the details provided are accurate? If yes, kindly save"
        }
        showCancelButton={true}
        showConfirmButton={true}
        handleCancel={() => {
          setCheckAlert(false);
          setEditMode(true);
        }}
        handleConfirm={() => {
          setCheckAlert(false);
          handleSave();
        }}
        isAlert={checkAlert}
      />

      {editMode ? (
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("Plan");
            setEditMode(false);
            setCheckAlert(true);
          }}
          style={styles.buttonContinue(editMode)}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText(editMode)}>Save</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate("Plan");
            setEditMode(true);
            inputRef.current && inputRef.current.focus();
          }}
          style={styles.buttonContinue(editMode)}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText(editMode)}>Edit</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RiskRegister;

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
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginTop: SIZES.small,
  },
  textInput: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginTop: SIZES.small + 4,
  },
  infocontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    width: "auto",
  },
  alertMessage: {
    color: COLORS.white,
    textAlign: "center",
  },
  alertText: {
    color: "black",
    fontFamily: FONT.bold,
  },
  alertContainer: {
    backgroundColor: "black",
    borderRadius: SIZES.medium,
    width: 200,
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
    fontSize: SIZES.medium
  },
  line: (edit) => ({
    backgroundColor: !edit ? "white" : COLORS.darkyellow,
    height: 1.4,
    width: "50%",
    marginTop: edit ? 1 : 6
  }),
  buttonContinue: (edit) => ({
    // margin: 80,
    height: 40,
    backgroundColor: edit ? "green" : COLORS.darkyellow,
    borderRadius: 10,
    width: 100,
    marginTop: 100,
    alignSelf: "center",
  }),
  buttonText: (edit) => ({
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    fontSize: SIZES.large,
    color: edit ? "white" : "black",
    fontFamily: FONT.bold,
  }),
});
