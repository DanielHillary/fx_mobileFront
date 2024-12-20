import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { executeAdvancedOrder, executeTrade } from "../../api/placeTradeApi";
import Toast from "react-native-toast-message";
import { AuthContext } from "../../context/AuthContext";
import { getAllUserAccounts } from "../../api/accountApi";
import SuccessModal from "../../components/modal/SuccessModal";
import ConfirmStrategyModal from "../../components/modal/ConfirmStrategyModal";
import AlertModal from "../../components/modal/AlertModal";

const DownArrow = () => {
  return (
    <View>
      <Image
        source={require("../../assets/icons/dropdown.png")}
        style={{ height: 10, width: 10 }}
      />
    </View>
  );
};

const Increment = ({
  item,
  increaseTotalCount,
  decreaseTotalCount,
  isPart,
}) => {
  const [numOfTrades, setNumOfTrades] = useState(0);

  const incrementCounter = () => {
    if (!isPart) {
      setNumOfTrades(0);
    } else {
      setNumOfTrades((prev) => prev + 1);
      increaseTotalCount(item.accountId, numOfTrades, isPart);
    }
  };
  const decreaseCounter = () => {
    if (numOfTrades != 0) {
      setNumOfTrades((prev) => prev - 1);
      decreaseTotalCount(item.accountId, numOfTrades, isPart);
    }
  };

  const removeTrades = (data) => {
    setNumOfTrades(0);
  };

  return (
    <View>
      <View style={styles.increment}>
        <TouchableOpacity
          onPress={() => {
            if (isPart) {
              decreaseCounter();
            } else {
              setNumOfTrades(0);
              alert("Please select account to increase or reduce positions");
            }
          }}
        >
          <Image
            source={require("../../assets/icons/minus.png")}
            style={{ height: 20, width: 20 }}
            resizeMethod="auto"
          />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            color: COLORS.lightWhite,
            width: 30,
            alignSelf: "center",
          }}
        >
          {numOfTrades}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (isPart) {
              incrementCounter();
            } else {
              setNumOfTrades(0);
              alert("Please select account to increase or reduce positions");
            }
          }}
        >
          <Image
            source={require("../../assets/icons/plus.png")}
            style={{ height: 20, width: 20 }}
            resizeMethod="auto"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Account = ({
  item,
  increaserCount,
  decreaserCount,
  lotSize,
  updateListForAccount,
  updateArrayForVolume,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [tradeNumber, setTradeNumber] = useState(0);
  const [volume, setVolume] = useState("");

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const removeFromList = () => {
    updateList(item.accountId, isPressed);
  };

  const updateNumber = (data) => {
    setTradeNumber(data);
  };

  const handleDebouncedChange = _.debounce((value) => {
    // Use debounced value here
    updateArrayForVolume(item.accountId, isPressed, value);
  }, 300);

  useEffect(() => {
    // setIsPressed(false); 
    setVolume(lotSize);
    updateArrayForVolume(item.accountId, isPressed, lotSize);
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: SIZES.small,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsPressed(!isPressed);
            updateListForAccount(item.accountId, !isPressed, lotSize);
            setVolume(lotSize);
          }}
        >
          <View>
            {isPressed ? (
              <Image
                source={require("../../assets/icons/checkbox.png")}
                style={styles.image}
              />
            ) : (
              <View style={styles.checkbox} />
            )}
          </View>
        </TouchableOpacity>
        <View style={{ width: 80, marginLeft: 8 }}>
          <Text style={[styles.text, { fontSize: SIZES.medium }]}>
            {item.login}
          </Text>
          <Text style={[styles.text, { fontSize: SIZES.small - 2 }]}>
            ${formatter.format(item.accountBalance)}
          </Text>
        </View>

        {/* <View style={{ width: 100, alignItems: "flex-start" }}>
          <Text style={[styles.text]}>{item.server}</Text>
        </View> */}

        <View
          style={{
            marginLeft: SIZES.xxLarge,
            width: 50,
            alignSelf: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.small + 2,
              fontFamily: FONT.regular,
              color: COLORS.lightWhite,
              marginLeft: 4,
            }}
          >
            Volume
          </Text>
          <TextInput
            placeholderTextColor={"gray"}
            placeholder={`${lotSize}`}
            keyboardType="numeric"
            numberOfLines={1}
            style={[styles.options, { width: "auto" }]}
            onChangeText={(num) => {
              if (isPressed) {
                setVolume(num);
                handleDebouncedChange(num);
                // body.entryPrice = entry;
              } else {
                alert("Please select account so you can input volume");
                setVolume("");
              }
            }}
            value={volume}
            onFocus={() => {
              if (!isPressed) {
                alert("Please select account so you can input volume");
              }
            }}
          />
        </View>

        <Increment
          item={item}
          isPart={isPressed}
          increaseTotalCount={increaserCount}
          decreaseTotalCount={decreaserCount}
          updateNumber={updateNumber}
        />
      </View>
    </View>
  );
};

const AutoTrader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [entry, setEntry] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [account, setAccount] = useState({});
  const [alert, setAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [userAccounts, setUserAccounts] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEntryModalVisible, setIsEntryModalVisible] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  const { accountDetails, userInfo } = useContext(AuthContext);

  const setAccountUp = async () => {
    let account = await AsyncStorage.getItem("accountInfo").then((res) => {
      return JSON.parse(res);
    });

    if (account === null && accountDetails === null) {
      setWaiting(true);
    }
    if (accountDetails === null || accountDetails.length === 0) {
      setAccount(account);
      if (account.accountName != "PsyDStarter") {
        if (account.paidAccount) {
          const response = await getAllUserAccounts(account.userId).then(
            (res) => {
              return res.data;
            }
          );
          if (response.status) {
            setUserAccounts(response.data.accountList);
          } else {
            //Set an alert modal that retries it.
            console.log(response.message);
          }
          setWaiting(false);
        } else {
          setAlertModal(true);
        }
      }
    } else {
      setAccount(accountDetails);
      if (accountDetails.accountName != "PsyDStarter") {
        if (accountDetails.paidAccount) {
          const response = await getAllUserAccounts(accountDetails.userId).then(
            (res) => {
              return res.data;
            }
          );
          if (response.status) {
            setUserAccounts(response.data.accountList);
          } else {
            //Set an alert modal that retries it.
            console.log(response.message);
          }
          setWaiting(false);
        } else {
          setAlertModal(true);
        }
      }
    }
  };

  useEffect(() => {
    setAccountUp();
  }, []);

  const setModalVisible = (value) => {
    setIsModalVisible(value);
    navigation.goBack();
  };

  const setEntryModalVisible = (value) => {
    setIsEntryModalVisible(value);
  };

  const [acctList, setAcctList] = useState([]);

  const updateArray = (id, amount, isPart) => {
    const alreadyExists = acctList.findIndex((obj) => obj.accountId === id);

    if (alreadyExists !== -1) {
      if (isPart) {
        acctList[alreadyExists] = {
          ...acctList[alreadyExists],
          accountId: id,
          tradeAmount: amount,
        };
        console.log("Is active");
      } else {
        const newArray = acctList.filter((obj) => obj.accountId !== id);
        console.log("Is not active");
        setAcctList(newArray);
      }
    } else {
      if (isPart) {
        const foundObjId = id;
        const newObj = {
          accountId: foundObjId,
          tradeAmount: amount,
        };
        setAcctList((prevList) => [...prevList, newObj]);
      }
    }
  };

  const updateArrayForAccount = (id, isPart, lot) => {
    const alreadyExists = acctList.findIndex((obj) => obj.accountId === id);

    if (alreadyExists !== -1) {
      if (isPart) {
        acctList[alreadyExists] = {
          ...acctList[alreadyExists],
          accountId: id,
        };
      } else {
        const newArray = acctList.filter((obj) => obj.accountId !== id);

        setAcctList(newArray);
      }
    } else {
      if (isPart) {
        const foundObjId = id;
        const newObj = {
          accountId: foundObjId,
          tradeAmount: 0,
          lotSize: lot,
        };
        setAcctList((prevList) => [...prevList, newObj]);
      }
    }
  };

  const updateArrayForVolume = (id, isPart, volume) => {
    const alreadyExists = acctList.findIndex((obj) => obj.accountId === id);

    if (alreadyExists !== -1) {
      if (isPart) {
        acctList[alreadyExists] = {
          ...acctList[alreadyExists],
          lotSize: parseFloat(volume),
        };
      } else {
        const newArray = acctList.filter((obj) => obj.accountId !== id);
        setAcctList(newArray);
      }
    } else {
      if (isPart) {
        const foundObjId = id;
        const newObj = {
          accountId: foundObjId,
          lotSize: parseFloat(volume),
          tradeAmount: 0,
        };
        setAcctList((prevList) => [...prevList, newObj]);
      }
    }
  };

  const increaser = (id, value, isPart) => {
    updateArray(id, value + 1, isPart);
    console.log(acctList);
  };

  const decreaser = (id, value, isPart) => {
    updateArray(id, value - 1, isPart);
    console.log(acctList);
  };

  const navigation = useNavigation();
  const route = useRoute();

  const details = route.params?.data || null;
  // console.log(details);

  const placeTradeOrder = async (
    ignoreEntries,
    confirmEntries,
    percentEntry,
    chosen
  ) => {
    setIsClicked(true);
    try {
      const tradeOrder = {
        assetCategory: details.assetCategory,
        comments: "title",
        currency: details.currency,
        lotSize: isPressed ? details.recommendedLotSize : details.lotSize,
        metaAccountId: account.metaApiAccountId,
        numberOfTradesToExecute: entry,
        stopLossPrice: details.stopLossPrice,
        strategy: "SF",
        symbol: details.asset,
        assetAbbrev: details.assetAbbrev,
        takeProfitPrice: details.takeProfitPrice,
        tradeType: details.tradeType == "BUY" ? "BUY INSTANT" : "SELL INSTANT",
        tradingPlanId: account.planId,
        userAccountId: account.accountId,
        actDetails: acctList,
        userId: userInfo.user.userId,
        ignoreEntries: ignoreEntries,
        confirmEntries: confirmEntries,
        entryPercent: percentEntry,
        tradeSetup: chosen,
      };

      const response = await executeTrade(tradeOrder).then((res) => {
        return res.data;
      });

      setIsClicked(false);
      if (response.status) {
        setIsModalVisible(true);
      } else {
        setAlert(true);
        Alert.alert("Failed transaction", response.message);
      }
    } catch (error) {
      console.log(error.message);
    }

    // console.log(response);
  };

  const checkValidTrade = () => {
    let valid = true;
    if(tradeType.startsWith("SELL") || tradeType.endsWith("SELL")){
      if(stopLoss < takeProfit){
        valid = false;
        Alert.alert(
          "Invalid stop levels",
          "For a SELL position, your stopLoss level is less than your take profit level. Please select the appropriate trade type"
        );
      }
    }else{
      if(stopLoss > takeProfit){
        valid = false
        Alert.alert(
          "Invalid stop levels",
          "For a BUY position, your stopLoss level is greater than your take profit level. Please select the appropriate trade type"
        );
      }
    }

    return valid;
  }

  const typelist = [
    {
      label: "INSTANT BUY",
      value: "BUY INSTANT",
    },
    {
      label: "INSTANT SELL",
      value: "SELL INSTANT",
    },
    {
      label: "SELL STOP",
      value: "SELL STOP",
    },
    {
      label: "BUY STOP",
      value: "BUY STOP",
    },
    {
      label: "BUY LIMIT",
      value: "BUY LIMIT",
    },
    {
      label: "SELL LIMIT",
      value: "SELL LIMIT",
    },
  ];
  return (
    <ScrollView style={styles.baseContainer}>
      <View style={styles.inputcontainer}>
        <DropDownPicker
          listMode="SCROLLVIEW"
          items={typelist}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          value={tradeType}
          setValue={(val) => {
            setTradeType(val);
            if (val() == "SELL INSTANT" || val() == "BUY INSTANT") {
              setEdit(false);
            } else {
              setEdit(true);
            }
          }}
          placeholder={
            details.tradeType == "SELL" ? "INSTANT SELL" : "INSTANT BUY"
          }
          placeholderStyle={{ fontSize: 14, fontWeight: "bold" }}
          style={{
            backgroundColor: "#111",
            borderColor: COLORS.darkyellow,
            height: 40,
            zIndex: -1,
          }}
          dropDownDirection="bottom"
          disableBorderRadius={false}
          textStyle={{ color: COLORS.darkyellow, fontSize: 14 }}
          labelStyle={{ color: COLORS.darkyellow, fontSize: 14 }}
          // arrowIconStyle={{backgroundColor: COLORS.darkyellow}}
          ArrowDownIconComponent={DownArrow}
          dropDownContainerStyle={{
            backgroundColor: "black",
            borderColor: COLORS.darkyellow,
          }}
        />
        <View style={styles.asset}>
          <Text
            style={{
              color: COLORS.lightWhite,
              textAlign: "center",
              paddingHorizontal: SIZES.small,
            }}
          >
            {details.asset}
          </Text>
        </View>
      </View>

      {edit && (
        <View
          style={{
            flexDirection: "row",
            marginLeft: SIZES.xLarge + 3,
            gap: SIZES.xSmall,
            paddingVertical: SIZES.small,
          }}
        >
          <Text
            style={{
              color: COLORS.lightWhite,
              fontSize: SIZES.xxLarge,
              alignSelf: "flex-end",
            }}
          >
            @ :::
          </Text>
          <View>
            <Text
              style={{
                fontSize: SIZES.medium,
                fontFamily: FONT.regular,
                color: COLORS.lightWhite,
                marginLeft: SIZES.xSmall - 4,
                marginBottom: SIZES.xSmall - 6,
              }}
            >
              Entry Price
            </Text>
            <TextInput
              placeholderTextColor={"gray"}
              keyboardType="numeric"
              numberOfLines={1}
              style={styles.options}
              onChangeText={(num) => {
                setEntryPrice(num);
                // body.entryPrice = entry;
              }}
              value={entryPrice}
            />
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: SIZES.medium,
          padding: SIZES.small,
          marginLeft: SIZES.small,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: SIZES.medium,
              fontFamily: FONT.regular,
              color: COLORS.lightWhite,
              marginLeft: SIZES.xSmall - 4,
            }}
          >
            S/L
          </Text>
          <TextInput
            placeholderTextColor={"gray"}
            placeholder={`${details.stopLossPrice}`}
            keyboardType="numeric"
            numberOfLines={1}
            style={styles.options}
            onChangeText={(num) => {
              setStopLoss(num);
              // body.entryPrice = entry;
            }}
            value={stopLoss}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: SIZES.medium,
              fontFamily: FONT.regular,
              color: COLORS.lightWhite,
              marginLeft: SIZES.xSmall - 4,
            }}
          >
            T/P
          </Text>
          <TextInput
            placeholderTextColor={"gray"}
            placeholder={`${details.takeProfitPrice}`}
            keyboardType="numeric"
            numberOfLines={1}
            style={styles.options}
            onChangeText={(num) => {
              setTakeProfit(num);
              // body.entryPrice = entry;
            }}
            value={takeProfit}
          />
        </View>
      </View>
      {account.accountName != "PsyDStarter" && (
        <Text
          style={[styles.text, { marginLeft: 30, marginTop: SIZES.medium }]}
        >
          Choose trading account(s)
        </Text>
      )}
      {account.accountName != "PsyDStarter" && (
        <Text
          style={{
            color: COLORS.lightWhite,
            textAlign: "center",
            fontSize: SIZES.xSmall,
            paddingHorizontal: SIZES.medium,
            marginVertical: SIZES.medium,
            marginTop: SIZES.small,
          }}
        >
          Attention!!!: For strict accounts, please note that you do not need to
          specify the volume for each account, we would calculate the
          appropriate lotSize based on your SL/TP parameters and your Risk
          Register.
        </Text>
      )}
      {userAccounts.length === 0 ? (
        <View
          style={{
            backgroundColor: COLORS.appBackground,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View>
          {userAccounts?.map((item) => (
            <Account
              item={item}
              key={item.accountId}
              increaserCount={increaser}
              decreaserCount={decreaser}
              lotSize={details.lotSize}
              updateArrayForVolume={updateArrayForVolume}
              updateListForAccount={updateArrayForAccount}
              updateList={updateArray}
            />
          ))}
        </View>
      )}
      {account.accountName != "PsyDStarter" ? (
        <Text
          style={{
            color: COLORS.lightWhite,
            textAlign: "center",
            fontSize: SIZES.xSmall,
            paddingHorizontal: SIZES.medium,
            marginVertical: SIZES.medium,
            marginTop: SIZES.small,
          }}
        >
          Attention!!: Please note that the trade will be executed at market
          conditions, difference with the request price may be significant.
        </Text>
      ) : (
        <View>
          <Text
            style={{
              color: COLORS.lightWhite,
              textAlign: "center",
              fontSize: SIZES.medium - 5,
              paddingHorizontal: SIZES.medium,
              marginVertical: SIZES.medium,
              marginTop: SIZES.large * 2,
            }}
          >
            Please register a real trading account in order able to use this
            feature and place trades.
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddNewAccount");
            }}
            style={styles.button}
          >
            {isClicked ? (
              <ActivityIndicator size="large" colors={"black"} />
            ) : (
              <Text style={styles.buttonText}>Register an account</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {account.accountName != "PsyDStarter" && (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <TouchableOpacity
            onPress={() => setIsPressed(!isPressed)}
            style={{
              marginLeft: 15,
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              {isPressed ? (
                <Image
                  source={require("../../assets/icons/checkbox.png")}
                  resizeMethod="scale"
                  style={styles.image}
                />
              ) : (
                <View style={styles.checkbox} />
              )}
            </View>

            <View style={{ marginTop: 3 }}>
              <Text
                style={[styles.text, { marginLeft: 10, fontSize: SIZES.small }]}
              >
                Use Recommended LotSize/Volume.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {account.accountName != "PsyDStarter" && (
        <TouchableOpacity
          onPress={() => {
            if (acctList.length === 0) {
              Alert.alert("", "Please choose an account");
            } else if (acctList[0].tradeAmount === 0) {
              Alert.alert("", "Please choose the number of positions to place");
            } else if(checkValidTrade()) {
              setIsEntryModalVisible(true);
            }
          }}
          style={styles.button}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText}>Place Order</Text>
          )}
        </TouchableOpacity>
      )}

      {/* <Speech placeAudioOrder={placeVoiceOrder}/> */}
      <Toast />
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

      <Modal
        visible={isEntryModalVisible}
        onRequestClose={() => {
          setIsEntryModalVisible(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <ConfirmStrategyModal
          setVisibility={setEntryModalVisible}
          openTrade={placeTradeOrder}
        />
      </Modal>

      <AlertModal
        isAlert={alertModal}
        handleCancel={() => {
          setAlertModal(false);
          navigation.goBack();
        }}
        handleConfirm={() => {
          setAlertModal(false);
          navigation.navigate("Pricing");
        }}
        message={
          "Please renew your subscription to continue using this feature"
        }
        showCancelButton={true}
        showConfirmButton={true}
        title={"Action required"}
      />
    </ScrollView>
  );
};

export default AutoTrader;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: "#111",
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
  },
  asset: {
    borderColor: COLORS.darkyellow,
    borderBottomWidth: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 170,
  },
  inputcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SIZES.large,
    alignItems: "center",
    width: 150,
    padding: SIZES.small,
    marginLeft: SIZES.medium,
  },
  checkbox: {
    height: 15,
    width: 15,
    borderColor: COLORS.darkyellow,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderRadius: 15,
    marginLeft: 5,
  },
  image: {
    height: 15,
    width: 15,
    marginLeft: 5,
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    height: 30,
    width: 80,
    paddingLeft: 10,
    borderRadius: 10,
    color: COLORS.lightWhite,
    backgroundColor: COLORS.appBackground,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    alignSelf: "center",
  },
  options: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    height: 30,
    width: 120,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: SIZES.xSmall - 4,
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 30,
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
  increment: {
    flexDirection: "row",
    marginLeft: SIZES.xLarge * 2,
    marginTop: SIZES.xSmall - 4,
    alignItems: "center",
    backgroundColor: COLORS.componentbackground,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    height: 18,
    borderRadius: 7,
  },
});
