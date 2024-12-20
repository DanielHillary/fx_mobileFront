import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import { COLORS, SIZES, FONT } from "../../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import { AuthContext } from "../../../context/AuthContext";
import {
  getRiskManager,
  updateRiskRegister,
} from "../../../api/tradingplanApi";
import EmptyList from "../../../components/EmptyList";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [editMode, setEditMode] = useState(false);
  const [checkAlert, setCheckAlert] = useState(false);
  const [riskManager, setRiskManager] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [timing, setTiming] = useState("AM");
  const [hasRisk, setHasRisk] = useState(true);
  const [drawDown, setDrawDown] = useState(0);

  const navigation = useNavigation();

  const { accountDetails } = useContext(AuthContext);

  const getRiskRegister = async () => {
    const response = await getRiskManager(accountDetails.planId).then((res) => {
      return res.data;
    });
    if (response.status) {
      setRiskManager(response.data);
      let risk = response.data;
      setHasRisk(true);

      await AsyncStorage.setItem("LPT", JSON.stringify(risk.allowedLossLevelPercentage));
      await AsyncStorage.setItem("LPD", JSON.stringify(risk.totalPercentRiskPerDay));
      await AsyncStorage.setItem("RRR", JSON.stringify(risk.riskRewardRatio));
      await AsyncStorage.setItem("PPT", JSON.stringify(risk.minProfitPercentPerTrade))
      await AsyncStorage.setItem("DV", JSON.stringify(risk.defaultVolume))
      await AsyncStorage.setItem("ADL", JSON.stringify(risk.overallDrawDown))
      await AsyncStorage.setItem("TP", JSON.stringify(risk.totalProfitPercentPerDay))
      
      console.log("Risk ID: " + risk.riskId);
    } else {
      setHasRisk(false);
      return null;
    }
  };

  useEffect(() => {
    getRiskRegister();
    AsyncStorage.getItem("LPT").then((res) => {
      if (res !== null) {
        setLossPerTrade(res);
      } else {
        getRiskRegister();
      }
    });
    AsyncStorage.getItem("LPD").then((res) => {
      if (res !== null) {
        setLossPerDay(res);
      } else {
        getRiskRegister();
      }
    });
    AsyncStorage.getItem("RRR").then((res) => {
      if (res !== null) {
        setMinRRR(res);
      } else {
        getRiskRegister();
      }
    });
    AsyncStorage.getItem("PPT").then((res) => {
      if (res !== null) {
        setMinProfitPerTrade(res);
      } else {
        getRiskRegister();
      }
    });
    AsyncStorage.getItem("DV").then((res) => {
      if (res !== null) {
        setDefaultVolume(res);
      } else {
        getRiskRegister();
      }
    });
    AsyncStorage.getItem("TP").then((res) => {
      if (res !== null) {
        setTargetProfit(res);
      } else {
        getRiskRegister();
      }
    });
    AsyncStorage.getItem("ADL").then((res) => {
      if (res !== null) {
        setDrawDown(res);
      } else {
        getRiskRegister();
      }
    });
  }, [accountDetails]);

  const onChange = (e, selectedDate) => {
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
  };

  const inputRef = useRef(null);

  const handleSave = async () => {

    riskManager.accountId = accountDetails.accountId;

    (riskManager.allowedLossLevelPercentage =
      lossPerTrade == ""
        ? riskManager.allowedLossLevelPercentage
        : lossPerTrade),
      (riskManager.defaultVolume =
        defaultVolume == "" ? riskManager.defaultVolume : defaultVolume),
      (riskManager.minProfitPercentPerTrade =
        minProfitPerTrade == ""
          ? riskManager.minProfitPercentPerTrade
          : minProfitPerTrade),
      (riskManager.riskRewardRatio =
        minRRR == "" ? riskManager.riskRewardRatio : minRRR),
      (riskManager.totalPercentRiskPerDay =
        lossPerDay == "" ? riskManager.totalPercentRiskPerDay : lossPerDay),
      (riskManager.totalProfitPercentPerDay =
        targetProfit == ""
          ? riskManager.totalProfitPercentPerDay
          : targetProfit),
      (riskManager.overallDrawDown =
        drawDown == "" ? riskManager.overallDrawDown : drawDown),
      (riskManager.dayInHour = hours),
      (riskManager.dayInMinute = minutes),
      (riskManager.dailyResetTime = date);

    const response = await updateRiskRegister(riskManager).then((res) => {
      return res.data;
    });
    if (response.status) {
      Alert.alert(
        "Updated",
        "You have successfully updated your risk register"
      );
      setEditMode(false);
    } else {
      Alert.alert("Failed transaction", response.message);
      console.log(response.message);
    }
  };

  if (riskManager.length === 0 && hasRisk === true) {
    return (
      <View
        style={{
          backgroundColor: COLORS.appBackground,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  if (hasRisk === false) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.appBackground,
          paddingTop: 30,
        }}
      >
        <EmptyList
          message={"You do not have a risk register. Kindly register one"}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddNewRiskRegister", {
              account: accountDetails,
            });
          }}
          style={styles.button}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttontext}>Set Risk Register</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.baseContainer}>
      <Text style={styles.intro}>Risk Register</Text>
      <Text style={[styles.text, { fontSize: SIZES.medium }]}>
        Your risk register is your check against every trade you take to ensure
        consistency and protection against the sting of the market.
      </Text>

      <Text
        style={[
          styles.text,
          {
            fontSize: SIZES.small,
            color: COLORS.darkyellow,
            marginTop: SIZES.medium,
            fontStyle: "italic",
          },
        ]}
      >
        Note: You can only change your exit levels if you haven't taken any
        trades with them or you have taken more than 10 trades with them.
      </Text>

      <View style={styles.infocontainer}>
        <View style={styles.infoEntry}>
          <Text
            style={{ color: "white", width: 100, fontSize: SIZES.medium - 3 }}
          >
            Max Acct% loss per trade
          </Text>

          {editMode ? (
            <TextInput
              ref={inputRef}
              placeholderTextColor={"gray"}
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => {
                setLossPerTrade(text);
                AsyncStorage.setItem("LPT", text);
              }}
              value={lossPerTrade}
            />
          ) : (
            <Text style={styles.textInput}>
              {lossPerTrade}%
            </Text>
          )}
          <View style={styles.line(editMode)} />
        </View>

        <View style={[styles.infoEntry, { marginLeft: 15 }]}>
          <Text
            style={{ color: "white", width: 100, fontSize: SIZES.medium - 3 }}
          >
            Max Acct% loss per day
          </Text>

          {editMode ? (
            <TextInput
              placeholderTextColor={"gray"}
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(num) => {
                setLossPerDay(num);
                AsyncStorage.setItem("LPD", num);
              }}
              value={lossPerDay}
            />
          ) : (
            <Text style={styles.textInput}>
              {lossPerDay}%
            </Text>
          )}
          <View style={styles.line(editMode)} />
        </View>
      </View>

      <View style={styles.infocontainer}>
        <View style={styles.infoEntry}>
          <Text
            style={{ color: "white", width: 80, fontSize: SIZES.medium - 3 }}
          >
            Minimum Risk/Reward Ratio
          </Text>

          {editMode ? (
            <TextInput
              placeholderTextColor={"gray"}
              // placeholder="0.0%"
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => {
                setMinRRR(text);
                AsyncStorage.setItem("RRR", text);
              }}
              value={minRRR}
            />
          ) : (
            <Text style={styles.textInput}>{minRRR}</Text>
          )}
          <View style={styles.line(editMode)} />
        </View>
        <View style={[styles.infoEntry, { marginLeft: 15 }]}>
          <Text
            style={{ color: "white", width: 120, fontSize: SIZES.medium - 3 }}
          >
            Min Acct% profit per trade
          </Text>

          {editMode ? (
            <TextInput
              placeholderTextColor={"gray"}
              // placeholder="0.0%"
              numberOfLines={1}
              keyboardType="numeric"
              style={[styles.input]}
              onChangeText={(text) => {
                setMinProfitPerTrade(text);
                AsyncStorage.setItem("PPT", text);
              }}
              value={minProfitPerTrade}
              // selection={{
              //   start: minProfitPerTrade.length,
              //   end: minProfitPerTrade.length,
              // }}
            />
          ) : (
            <Text style={styles.textInput}>
              {minProfitPerTrade}%
            </Text>
          )}
          <View style={styles.line(editMode)} />
        </View>
      </View>

      <View style={styles.infocontainer}>
        <View style={styles.infoEntry}>
          <Text
            style={{ color: "white", width: 120, fontSize: SIZES.medium - 3 }}
          >
            Default Volume/LotSize per trade
          </Text>

          {editMode ? (
            <TextInput
              placeholderTextColor={"gray"}
              // placeholder="0.0"
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => {
                setDefaultVolume(text);
                AsyncStorage.setItem("DV", text);
              }}
              value={defaultVolume}
            />
          ) : (
            <Text style={styles.textInput}>{defaultVolume}</Text>
          )}
          <View style={styles.line(editMode)} />
        </View>

        <View style={[styles.infoEntry, { marginLeft: 15 }]}>
          <Text
            style={{ color: "white", width: 100, fontSize: SIZES.medium - 3 }}
          >
            Daily Acct% profit target
          </Text>

          {editMode ? (
            <TextInput
              placeholderTextColor={"gray"}
              // placeholder="0.0"
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => {
                setTargetProfit(text);
                AsyncStorage.setItem("TP", text);
              }}
              value={targetProfit}
            />
          ) : (
            <Text style={styles.textInput}>
              {targetProfit}%
            </Text>
          )}
          <View style={styles.line(editMode)} />
        </View>
      </View>

      <View style={styles.infocontainer}>
        <View style={styles.infoEntry}>
          <Text
            style={{ color: "white", width: 120, fontSize: SIZES.medium - 3 }}
          >
            Overall Account Drawdown Limit
          </Text>

          {editMode ? (
            <TextInput
              placeholderTextColor={"gray"}
              // placeholder="0.0%"
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => {
                setDrawDown(text);
                AsyncStorage.setItem("ADL", text);
              }}
              value={drawDown}
            />
          ) : (
            <Text style={styles.textInput}>{drawDown}%</Text>
          )}
          <View style={styles.line(editMode)} />
        </View>

        {/* <View style={[styles.infoEntry, { marginLeft: 15 }]}>
          <Text
            style={{ color: "white", width: 100, fontSize: SIZES.medium - 3 }}
          >
            Daily Acct % profit target
          </Text>

          {editMode ? (
            <TextInput
              placeholderTextColor={"gray"}
              // placeholder="0.0"
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => {
                setTargetProfit(text);
              }}
              value={targetProfit}
            />
          ) : (
            <Text style={styles.textInput}>
              {riskManager.totalProfitPercentPerDay}%
            </Text>
          )}
          <View style={styles.line(editMode)} />
        </View> */}
      </View>

      <View style={{ marginTop: SIZES.xxLarge + 5, flexDirection: "row" }}>
        <Text style={[styles.text, { alignSelf: "flex-end", marginBottom: 5 }]}>
          Your daily reset time:
        </Text>

        <TouchableOpacity
          onPress={() => {
            if (editMode) {
              setShowDate(true);
            } else {
              Alert.alert(
                "",
                "Please click the edit button to change your time"
              );
              console.log("");
            }
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
          {
            marginTop: 30,
            fontStyle: "italic",
            color: COLORS.white,
            textAlign: "center",
            fontSize: SIZES.small,
          },
        ]}
      >
        NOTE!!!: We calculate your drawdown from the starting balance on the
        first trade your losing streak. For strict accounts, if you hit your
        overall drawdown limit, you would not be able to place any trades on
        your account for a period of 3 trading days.
      </Text>

      <AlertModal
        message={
          "Are you sure the details provided are accurate? If yes, kindly save"
        }
        showCancelButton={true}
        showConfirmButton={true}
        handleCancel={() => {
          setCheckAlert(false);
          setEditMode(false);
        }}
        handleConfirm={() => {
          setCheckAlert(false);
          handleSave();
        }}
        isAlert={checkAlert}
      />

      {editMode ? (
        <View
          style={{
            flexDirection: "row",
            gap: SIZES.medium * 2,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate("Plan");
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
          <TouchableOpacity
            onPress={() => {
              setEditMode(!editMode);
            }}
            style={styles.buttonContinue(!editMode)}
          >
            <Text style={styles.buttonText(!editMode)}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    </ScrollView>
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
    marginTop: 10,
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
    fontSize: SIZES.medium,
  },
  line: (edit) => ({
    backgroundColor: !edit ? "white" : COLORS.darkyellow,
    height: 1.4,
    width: "50%",
    marginTop: edit ? 1 : 6,
  }),
  buttonContinue: (edit) => ({
    // margin: 80,
    height: 40,
    backgroundColor: edit ? "green" : COLORS.darkyellow,
    borderRadius: 10,
    width: 100,
    marginTop: 65,
    marginBottom: 40,
    alignSelf: "center",
  }),
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 200,
    marginTop: 40,
    alignSelf: "center",
  },
  buttonText: (edit) => ({
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    fontSize: SIZES.large,
    color: edit ? "white" : "black",
    fontFamily: FONT.bold,
  }),
  buttontext: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    fontSize: SIZES.medium,
    color: "black",
    fontFamily: FONT.bold,
  },
});
