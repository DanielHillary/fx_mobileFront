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
  registerLossExitStrategy,
  registerProfitExitStrategy,
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

const ExitStrategy = () => {
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
  const [profitCount, setProfitCount] = useState(1);
  const [lossCount, setLossCount] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [isCheckLevels, setIsCheckLevels] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [slLossValue, setSlLossValue] = useState(0);
  const [slLossFocused, setSlLossFocused] = useState(false);

  const setModalVisible = (value) => {
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

  const account = route.params?.account || null;
  const tradingPlan = route.params?.tradingPlan || null;

  const checkEmptyLevels = () => {
    if (
      slValue != 0 &&
      profitLotSize != 0 &&
      lossLotSize != 0 &&
      tpValue != 0
    ) {
      return true;
    }
    return false;
  };

  const checkEmptyLevelsForProfit = () => {
    if (profitLotSize == 0 && slProfitValue == 0 && slLossValue == 0) {
      return false
    }
    return true;
  };

  const checkEmptyLevelsForLoss = () => {
    if (lossLotSize == 0) {
      return false;
    }
    return true;
  };

  const registerProfit = async () => {
    const body = {
      count: profitCount,
      inProfit: true,
      accountId: account.accountId,
      count: profitCount,
      inTradeProfitLevel: tpValue,
      lotSizePercentWhenTradeInProfit: profitLotSize,
      metaAccountId: account.metaApiAccountId,
      original: true,
      slPlacementPercentIsForProfit: slLossValue == 0 ? true : false,
      slplacementPercentAfterProfit: slProfitValue == 0 ? 1 : slProfitValue,
      tradingPlanId: tradingPlan.planId,
    };

    const response = await registerProfitExitStrategy(body).then((res) => {
      return res.data;
    });
    if (response.status) {
      setIsModalVisible(true);
      setProfitLotSize(0);
      setSlProfitValue(0);
      setTpValue(0);
    } else {
      Alert.alert("Transaction failed", response.message);
    }
  };

  const registerLoss = async () => {
    const body = {
      allowedLossLevelPercentage: slValue,
      count: lossCount,
      accountId: account.accountId,
      inProfit: false,
      lotSizePercentWhenTradeInLoss: lossLotSize,
      metaAccountId: account.metaApiAccountId,
      original: true,
      slPlacementPercentIsForProfit: false,
      slplacementPercentAfterProfit: 100,
      tradingPlanId: tradingPlan.planId,
    };

    const response = await registerLossExitStrategy(body).then((res) => {
      return res.data;
    });
    if (response.status) {
      setIsModalVisible(true);
      setSlValue(0);
      setLossLotSize(0);
    } else {
      Alert.alert("Transaction failed", response.message);
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

    navigation.navigate("RiskManager", {
      account: account,
      tradingPlan: tradingPlan,
    });
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
          Register Your Exit Strategy
        </Text>
        <Text style={[styles.text, { fontSize: SIZES.medium }]}>
          Your exit strategy is made up of exit levels. Exit levels are market
          price defined zones where a trader seeks to either secure some profit
          or mitigate occuring losses.
        </Text>

        <Text style={[styles.text, { fontSize: SIZES.medium }]}>Example:</Text>
        <Text
          style={[
            styles.text,
            { fontSize: SIZES.medium, color: COLORS.darkyellow, marginTop: 2 },
          ]}
        >
          "At 50% of my profit target, partially close my trade by 50% and set
          my stopLoss to secure 10% of profit"
        </Text>
      </View>

      <Text
        style={[styles.text, { marginTop: SIZES.medium, fontStyle: "italic" }]}
      >
        Click on the numbered space to enter your levels
      </Text>

      <Text
        style={[styles.text, { marginTop: SIZES.medium, fontStyle: "italic" }]}
      >
        Note: To break-even, set secure profit percent at 1
      </Text>

      <View style={{ marginTop: 30 }}>
        <View style={{ flexDirection: "row", gap: SIZES.small }}>
          <Text style={{ color: COLORS.lightWhite }}>Add Profit Level</Text>
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
              % , and set my stopLoss to secure
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
                if (slLossValue == 0) {
                  setSlProfitValue(text);
                } else {
                  setSlProfitValue(0);
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

            <Text style={styles.levelText}>% of current profit.</Text>
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
                }else {
                  setSlLossValue(0);
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
          setIsLossAlert(false);
        }}
        isAlert={isLossAlert}
      />

      <AlertModal
        message={
          "You have some spaces left out. Please fill in the missing figures before you continue"
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
          navigation.navigate("RiskManager");
          setIsCheckLevels(false);
        }}
        isAlert={isCheckLevels}
      />

      <TouchableOpacity
        onPress={() => {
          if (lossCount == 0 && profitCount == 0) {
            if (!checkEmptyLevels()) {
              setIsCheckLevels(true);
            } else {
              registerExits();
            }
          } else {
            if (lossCount == 0) {
              if (checkEmptyLevelsForLoss()) {
                setIsLossAlert(true);
              } else {
                setIsContinue(true);
              }
            }
            if (profitCount == 0) {
              if (checkEmptyLevelsForProfit()) {
                setIsProfitAlert(true);
              } else {
                setIsContinue(true);
              }
            }
            // setIsContinue(true);
            navigation.navigate("RiskManager", {
              account: account,
              tradingPlan: tradingPlan,
            });
          }
        }}
        style={styles.buttonContinue}
      >
        {isClicked ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>

      <View
        style={{ flexDirection: "row", alignSelf: "center", marginBottom: 60 }}
      >
        <Text
          style={{
            color: COLORS.lightWhite,
            padding: SIZES.small - 3,
          }}
        >
          Don't have an exit strategy yet?
        </Text>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            navigation.navigate("RiskManager");
          }}
        >
          <Text
            style={{
              color: COLORS.darkyellow,
              alignSelf: "center",
              fontWeight: "500",
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <SuccessModal setVisibility={setModalVisible} />
      </Modal>
    </ScrollView>
  );
};

export default ExitStrategy;

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
    fontSize: SIZES.small,
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
