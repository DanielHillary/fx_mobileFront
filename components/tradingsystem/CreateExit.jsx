import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, SIZES, FONT } from "../../constants";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  registerNewLossExitStrategy,
  registerNewProfitExitStrategy,
} from "../../api/tradingplanApi";
import SuccessModal from "../modal/SuccessModal";

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
        onDismiss={handleCancel}
        message={message}
        messageStyle={styles.alertMessage}
      />
    </View>
  );
};

const CreateExit = () => {
  const [tpValue, setTpValue] = useState(0);
  const [slValue, setSlValue] = useState(0);
  const [slProfitValue, setSlProfitValue] = useState(0);
  const [profitLotSize, setProfitLotSize] = useState(0);
  const [lossLotSize, setLossLotSize] = useState(0);
  const [tpFocused, setTpFocused] = useState(false);
  const [slFocused, setSlFocused] = useState(false);
  const [lotSizeFocused, setLotSizeFocused] = useState(false);
  const [isProfitAlert, setIsProfitAlert] = useState(false);
  const [isLossAlert, setIsLossAlert] = useState(false);
  const [profitCount, setProfitCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [isCheckLevels, setIsCheckLevels] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [slLossFocused, setSlLossFocused] = useState(false);
  const [slLossValue, setSlLossValue] = useState(0);
  const [profitSL, setProfitSL] = useState(false);

  const setVisibility = (value) => {
    setIsModalVisible(value);
  };

  const getAccount = async () => {
    const account = await AsyncStorage.getItem("accountInfo").then((res) => {
      return JSON.parse(res);
    });
    setAccountInfo(account);
  };

  useEffect(() => {
    getAccount();
  }, []);

  const navigation = useNavigation();

  const route = useRoute();

  const dataFrom = route?.params.value || null;

  const checkEmptyLevelsForProfit = () => {
    if (profitLotSize == 0 && slProfitValue == 0 && slLossValue == 0) {
      return false;
    }
    return true;
  };

  const checkEmptyLevelsForLoss = () => {
    if (lossLotSize == 0) {
      return false;
    }
    return true;
  };

  const handleFinish = () => {
    const isProfit = dataFrom === "Edit Profit";
    const count = isProfit ? profitCount : lossCount;

    if (checkEmptyLevels(isProfit) && count === 0) {
      // Warn trader that they haven't registered any new exit levels
      setIsContinue(true);
    } else if (checkEmptyLevels(isProfit) && count !== 0) {
      // Move to the tradingPlan page
      navigation.navigate("Plan");
    } else {
      // Ask for assurance, Save the current exit and Move to the TradingPlan Page
      setIsCheckLevels(true);
    }
  };

  const checkEmptyLevels = (isProfit) => {
    const levels = isProfit
      ? checkEmptyLevelsForProfit()
      : checkEmptyLevelsForLoss();
    return levels;
  };

  const registerProfit = async () => {
    const body = {
      accountId: accountInfo.accountId,
      count: profitCount,
      inProfit: true,
      inTradeProfitLevel: tpValue,
      lotSizePercentWhenTradeInProfit: profitLotSize,
      metaAccountId: accountInfo.metaApiAccountId,
      original: true,
      slPlacementPercentIsForProfit: slLossValue == 0 ? true : false,
      slplacementPercentAfterProfit: slProfitValue == 0 ? 1 : slProfitValue,
      tradingPlanId: accountInfo.planId,
    };

    const response = await registerNewProfitExitStrategy(body).then((res) => {
      return res.data;
    });
    if (response.status) {
      setIsModalVisible(true);
      setSlProfitValue(0);
      setTpValue(0);
      setProfitLotSize(0);
    } else {
      Alert.alert("Failed", response.message);
    }
  };

  const registerLoss = async () => {
    const body = {
      accountId: accountInfo.accountId,
      allowedLossLevelPercentage: slValue,
      count: lossCount,
      inProfit: false,
      lotSizePercentWhenTradeInLoss: profitLotSize,
      metaAccountId: accountInfo.metaApiAccountId,
      original: true,
      slPlacementPercentIsForProfit: false,
      slplacementPercentAfterProfit: 100,
      tradingPlanId: accountInfo.planId,
    };

    const response = await registerNewLossExitStrategy(body).then((res) => {
      return res.data;
    });
    if (response.status) {
      setIsModalVisible(true);
      setSlValue(0);
      setLossLotSize(0);
    } else {
      Alert.alert("Failed", response.message);
    }
  };

  const registerExits = () => {
    if (lossCount === 0) {
      setLossCount(1);
    }
    if (profitCount === 0) {
      setProfitCount(1);
    }
    registerProfit();
    registerLoss();

    navigation.navigate("RiskManager");
  };

  return (
    <ScrollView style={styles.baseContainer}>
      <View>
        <Text
          style={{
            color: COLORS.lightWhite,
            fontFamily: FONT.bold,
            fontSize: SIZES.xLarge + 4,
          }}
        >
          Register Your {dataFrom == "Edit Profit" ? "Profit" : "Loss"} Exits
        </Text>
        <Text style={[styles.text, { fontSize: SIZES.medium }]}>
          Your exit strategy is made up of exit levels. Exit levels are market
          price defined zones where a trader seeks to either secure some profit
          or mitigate occuring losses.
        </Text>

        <Text style={[styles.text, { fontSize: SIZES.medium }]}>Example:</Text>
        {dataFrom == "Edit Profit" ? (
          <Text
            style={[
              styles.text,
              {
                fontSize: SIZES.medium,
                color: COLORS.darkyellow,
                marginTop: 2,
              },
            ]}
          >
            "At 50% of my profit target, partially close my trade by 50% and set
            my stopLoss to secure 10% of profit"
          </Text>
        ) : (
          <Text
            style={[
              styles.text,
              {
                fontSize: SIZES.medium,
                color: COLORS.darkyellow,
                marginTop: 2,
              },
            ]}
          >
            "At 50% of my risk size, partially close my trade by 50%"
          </Text>
        )}
      </View>

      <Text
        style={[styles.text, { marginTop: SIZES.medium, fontStyle: "italic" }]}
      >
        Click on the numbered space to enter your levels
      </Text>

      {dataFrom == "Edit Profit" && (
        <Text
          style={[
            styles.text,
            { marginTop: SIZES.medium, fontStyle: "italic" },
          ]}
        >
          Note: To break-even, set secure profit percent at 1
        </Text>
      )}

      {dataFrom == "Edit Profit" ? (
        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: "row", gap: SIZES.small }}>
            <Text style={{ color: COLORS.lightWhite }}>Add Profit Levels</Text>
            <TouchableOpacity
              onPress={() => {
                if (checkEmptyLevelsForProfit()) {
                  setIsProfitAlert(true);
                } else {
                  setIsContinue(true);
                }
              }}
            >
              <Image
                source={require("../../assets/icons/add.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.contain}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.levelText}>At</Text>
              <TextInput
                placeholder="0"
                placeholderTextColor={COLORS.darkyellow}
                style={styles.email(tpFocused)}
                numberOfLines={1}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setTpValue(text);
                }}
                value={tpValue}
                onFocus={() => {
                  setTpFocused(true);
                }}
                onBlur={() => {
                  setTpFocused(false);
                }}
              />

              <Text style={styles.levelText}>
                % of my profit target, partially close my trade
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.levelText}>by</Text>
              <TextInput
                placeholder="0"
                placeholderTextColor={COLORS.darkyellow}
                style={styles.email(lotSizeFocused)}
                numberOfLines={1}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setProfitLotSize(text);
                }}
                value={profitLotSize}
                onFocus={() => {
                  setLotSizeFocused(true);
                }}
                onBlur={() => {
                  setLotSizeFocused(false);
                }}
              />

              <Text style={styles.levelText}>
                %, and set my stopLoss price to secure
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="0"
                placeholderTextColor={COLORS.darkyellow}
                style={[styles.email(slFocused), { marginLeft: 0 }]}
                keyboardType="numeric"
                numberOfLines={1}
                onChangeText={(text) => {

                  if(slLossValue == 0){
                    setSlProfitValue(text);
                  }else{
                    alert("You cannot secure profit because you already set your SL to reduce your risk size")
                  }
                  
                }}
                value={slProfitValue}
                onFocus={() => {
                  setSlFocused(true);
                }}
                onBlur={() => {
                  setSlFocused(false);
                }}
              />

              <Text style={styles.levelText}>% of my profit target,</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.levelText}>OR reduce my risk size by </Text>
              <TextInput
                placeholder="0"
                placeholderTextColor={COLORS.darkyellow}
                style={[styles.email(slLossFocused), { marginLeft: 0 }]}
                keyboardType="numeric"
                numberOfLines={1}
                onChangeText={(text) => {
                  if(slProfitValue == 0){
                    setSlLossValue(text);
                  }else{
                    alert("You do not have any risks because you already set your SL to secure some profit.")
                  }
                }}
                value={slLossValue}
                onFocus={() => {
                  setSlLossFocused(true);
                }}
                onBlur={() => {
                  setSlLossFocused(false);
                }}
              />
              <Text style={styles.levelText}>% of my current risk.</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", gap: SIZES.small }}>
            <Text style={{ color: COLORS.lightWhite }}>Add Loss Level</Text>
            <TouchableOpacity
              onPress={() => {
                if (checkEmptyLevelsForLoss()) {
                  setIsLossAlert(true);
                } else {
                  setIsContinue(true);
                }
              }}
            >
              <Image
                source={require("../../assets/icons/add.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.contain}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.levelText}>At</Text>
              <TextInput
                placeholder="0"
                placeholderTextColor={COLORS.darkyellow}
                style={styles.email(tpFocused)}
                numberOfLines={1}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setSlValue(text);
                }}
                value={slValue}
                onFocus={() => {
                  setTpFocused(true);
                }}
                onBlur={() => {
                  setTpFocused(false);
                }}
              />

              <Text style={styles.levelText}>
                % of my risk size, partially close my trade
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.levelText}>by</Text>
              <TextInput
                placeholder="0"
                placeholderTextColor={COLORS.darkyellow}
                style={styles.email(lotSizeFocused)}
                numberOfLines={1}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setLossLotSize(text);
                }}
                value={lossLotSize}
                onFocus={() => {
                  setLotSizeFocused(true);
                }}
                onBlur={() => {
                  setLotSizeFocused(false);
                }}
              />

              <Text style={styles.levelText}>%</Text>
            </View>
          </View>
        </View>
      )}

      <AlertModal
        message={
          "Are you sure the details provided are accurate? If yes, kindly save"
        }
        showCancelButton={true}
        showConfirmButton={true}
        handleCancel={() => {
          setIsProfitAlert(false);
        }}
        handleConfirm={() => {
          console.log(profitCount);
          setProfitCount((prev) => prev + 1);
          registerProfit();
          setIsProfitAlert(false);
        }}
        isAlert={isProfitAlert}
      />

      <AlertModal
        message={
          "Are you sure the details provided are accurate? If yes, kindly save"
        }
        showCancelButton={true}
        showConfirmButton={true}
        handleCancel={() => {
          setIsLossAlert(false);
        }}
        handleConfirm={() => {
          setLossCount((prev) => prev + 1);
          registerLoss();
        }}
        isAlert={isLossAlert}
      />

      <AlertModal
        message={
          "You have some spaces left out. Please properly fill in your figures before you continue"
        }
        showCancelButton={true}
        showConfirmButton={false}
        handleCancel={() => {
          setIsContinue(false);
        }}
        handleConfirm={() => {}}
        isAlert={isContinue}
      />

      <AlertModal
        message={
          "Are you sure the details provided are accurate? If yes, kindly save"
        }
        showCancelButton={true}
        showConfirmButton={true}
        handleCancel={() => {
          setIsCheckLevels(false);
        }}
        handleConfirm={() => {
          // registerExits();
          navigation.navigate("Plan");
          setIsCheckLevels(false);
        }}
        isAlert={isCheckLevels}
      />

      <TouchableOpacity
        onPress={() => {
          // handleFinish();
          navigation.goBack();
        }}
        style={styles.buttonContinue}
      >
        {isClicked ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Finish</Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <SuccessModal setVisibility={setVisibility} />
      </Modal>
    </ScrollView>
  );
};

export default CreateExit;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  text: {
    color: COLORS.lightWhite,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    marginTop: SIZES.small,
  },
  contain: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    borderRadius: SIZES.xSmall - 4,
    padding: SIZES.small,
    alignItems: "center",
    marginTop: SIZES.small,
  },
  alertContainer: {
    backgroundColor: "black",
    borderRadius: SIZES.medium,
    width: 200,
  },
  alertText: {
    color: "black",
    fontFamily: FONT.bold,
  },
  levelText: {
    color: COLORS.lightWhite,
    alignSelf: "flex-end",
    fontSize: SIZES.small + 2,
    marginBottom: 4,
    fontFamily: FONT.medium,
  },
  alertMessage: {
    color: COLORS.white,
    textAlign: "center",
  },
  email: (focused) => ({
    borderColor: focused ? COLORS.darkyellow : COLORS.appBackground,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    paddingHorizontal: focused ? SIZES.xSmall - 4 : 0,
    height: 30,
    color: COLORS.darkyellow,
    fontSize: SIZES.xLarge,
    marginLeft: SIZES.xSmall - 4,
  }),
  buttonContinue: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 200,
    marginTop: 40,
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
