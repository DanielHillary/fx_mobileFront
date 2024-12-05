import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  LogBox,
  Alert,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  COLORS,
  Currencies,
  FONT,
  SIZES,
  Synthetics,
  tradeTypelist,
} from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from "react-native-gesture-handler";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  executeAdvancedOrder,
  executeTrade,
  voiceTradeOrder,
} from "../../api/placeTradeApi";
import Toast from "react-native-toast-message";
import _ from "lodash";
import { getAllUserAccounts } from "../../api/accountApi";
import { AuthContext } from "../../context/AuthContext";
import SuccessModal from "../../components/modal/SuccessModal";
import ConfirmStrategyModal from "../../components/modal/ConfirmStrategyModal";
import AlertModal from "../../components/modal/AlertModal";
import Speech from "../../components/Speech";

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

const Details = ({ selectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [assetType, setAssetType] = useState(" ");
  const [items, setItems] = useState([
    { label: "Synthetics", value: "Synthetic" },
    { label: "Currencies", value: "Currencies" },
  ]);
  const [isFocus, setIsFocus] = useState(false);

  const categories = [
    { label: "Synthetics", value: "Synthetic" },
    { label: "Currencies", value: "Currencies" },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        gap: SIZES.small - 2,
        alignSelf: "center",
        width: 170,
      }}
    >
      <Dropdown
        style={{
          backgroundColor: "#111",
          borderWidth: 0.9,
          borderRadius: SIZES.small - 4,
          borderColor: COLORS.darkyellow,
          width: 150,
          marginBottom: 10,
          padding: SIZES.small - 4,
          zIndex: -1,
        }}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.placeholder}
        itemTextStyle={{
          fontFamily: FONT.bold,
          color: COLORS.darkyellow,
          backgroundColor: "#111",
        }}
        inputSearchStyle={{
          color: COLORS.white,
          borderColor: COLORS.darkyellow,
          padding: 2,
          borderRadius: SIZES.small - 4,
        }}
        // iconStyle={styles.iconContainer}
        data={items.map((item) => ({
          label: item?.label,
          value: item?.value,
        }))}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Category" : "..."}
        searchPlaceholder="Search..."
        renderRightIcon={() => <DownArrow />}
        value={assetType}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          // onChange(item.value);
          setAssetType(item.value);
          selectCategory(item.value);
          setIsFocus(false);
        }}
        containerStyle={{
          backgroundColor: "#111",
          borderColor: COLORS.darkyellow,
          borderRadius: SIZES.small,
        }}
        activeColor="#111"
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
      if (!isPart) {
        setNumOfTrades(0);
      } else {
        setNumOfTrades((prev) => prev - 1);
        decreaseTotalCount(item.accountId, numOfTrades, isPart);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setNumOfTrades(0);
    }, [])
  );

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
const accountList = [2];

const Account = ({
  item,
  increaserCount,
  decreaserCount,
  updateList,
  updateArrayForVolume,
  updateListForAccount,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [tradeNumber, setTradeNumber] = useState(0);
  const [volume, setVolume] = useState("");

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const removeFromList = () => {
    setVolume("");
  };

  const updateNumber = (data) => {
    setTradeNumber(data);
  };

  useEffect(() => {
    setIsPressed(false);
    setVolume("");
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setIsPressed(false);
      setVolume("");
    }, [])
  );

  const handleDebouncedChange = _.debounce((value) => {
    // Use debounced value here
    updateArrayForVolume(item.accountId, isPressed, value);
  }, 300);

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
            updateListForAccount(item.accountId, !isPressed);
            if (!isPressed) {
              setVolume("");
            }
          }}
          style={{ flexDirection: "row" }}
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

          <View style={{ width: 80, marginLeft: 8 }}>
            <Text style={[styles.text, { fontSize: SIZES.medium }]}>
              {item.login}
            </Text>
            <Text style={[styles.text, { fontSize: SIZES.small - 2 }]}>
              {formatter.format(item.accountBalance)}
            </Text>
            <Text style={[styles.text, { fontSize: SIZES.small }]}>
              {item.server}
            </Text>
          </View>
        </TouchableOpacity>

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
            placeholder={`0.00`}
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

const TradingBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [tradeAsset, setTradeAsset] = useState("");
  const [userAccounts, setUserAccounts] = useState([]);
  const [entry, setEntry] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [account, setAccount] = useState({});
  const [alert, setAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [assetType, setAssetType] = useState("");
  const [isCurrencies, setIsCurrencies] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEntryModalVisible, setIsEntryModalVisible] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [entryAlert, setEntryAlert] = useState(false);
  // const [totalTrades, setTotalTrades] = useState(0);

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
    navigation.navigate("Home");
  };

  const setEntryModalVisible = (value) => {
    setIsEntryModalVisible(value);
  };

  const [acctList, setAcctList] = useState([]);

  const selectSymbolType = (value) => {
    if (value == "Currencies") {
      setIsCurrencies(true);
    } else {
      setIsCurrencies(false);
    }
    setTradeAsset(value);
  };

  const updateArrayForAccount = (id, isPart) => {
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
          lotSize: 0,
        };
        setAcctList((prevList) => [...prevList, newObj]);
      }
    }
  };

  const updateArray = (id, amount, isPart) => {
    const alreadyExists = acctList.findIndex((obj) => obj.accountId === id);

    if (alreadyExists !== -1) {
      if (isPart) {
        acctList[alreadyExists] = {
          ...acctList[alreadyExists],
          accountId: id,
          tradeAmount: amount,
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
          tradeAmount: amount,
          lotSize: 0,
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
    // console.log(acctList);
  };

  const decreaser = (id, value, isPart) => {
    updateArray(id, value - 1, isPart);
    // console.log(acctList);
  };

  useFocusEffect(
    React.useCallback(() => {
      setAcctList([]);
      setAccountUp();
    }, [])
  );

  const navigation = useNavigation();

  const placeVoiceOrder = async (request) => {
    if (!account.hasRiskManagement) {
      Alert.alert(
        "Strict Account",
        "Please create a risk register, else you would not be allowed to trade"
      );
      return;
    }
    setIsClicked(true);
    const body = {
      userId: account.userId,
      accountId: account.accountId,
      orderText: request,
      metaAccountId: account.metaApiAccountId,
      tradingPlanId: account.planId,
    };

    const response = await voiceTradeOrder(body).then((res) => {
      return res.data;
    });
    if (response.status) {
      setIsModalVisible(true);
    } else {
      Alert.alert("", response.message);
    }
    setIsClicked(false);
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
      if(stopLoss > takeProfit && takeProfit.length !== 0){
        valid = false
        Alert.alert(
          "Invalid stop levels",
          "For a BUY position, your stopLoss level is greater than your take profit level. Please select the appropriate trade type"
        );
      }
    }

    return valid;
  }

  const placeOrderForTrade = (ignoreEntries, confirmEntries, percentEntry, chosen) => {
    if (account.strict && !account.hasRiskManagement) {
      Alert.alert(
        "Strict Account",
        "Please create a risk register, else you would not be allowed to trade based on the strict mode policy."
      );
    }else if ((stopLoss.length === 0) || (takeProfit.length === 0)) {
      if (account.strict && !account.hasRiskManagement) {
        Alert.alert(
          "Strict Account",
          "Please create a risk register, else you need to provide your SL/TP prices"
        );
      } else {
        placeTradeOrder(ignoreEntries, confirmEntries, percentEntry, chosen);
      }
    }else{
      placeTradeOrder(ignoreEntries, confirmEntries, percentEntry, chosen);
    }
  };

  const placeTradeOrder = async (
    ignoreEntries,
    confirmEntries,
    percentEntry,
    chosen
  ) => {
    setIsClicked(true);
    const tradeOrder = {
      assetCategory: isCurrencies ? "Currencies" : "Synthetic",
      comments: "title",
      lotSize: 0,
      metaAccountId: account.metaApiAccountId,
      numberOfTradesToExecute: entry,
      stopLossPrice: stopLoss,
      strategy: "SF",
      symbol: assetType,
      takeProfitPrice: takeProfit,
      tradeType: tradeType,
      tradingPlanId: account.planId,
      userAccountId: account.accountId,
      actDetails: acctList,
      userId: userInfo.user.userId,
      assetAbbrev: selectedLabel,
      ignoreEntries: ignoreEntries,
      confirmEntries: confirmEntries,
      entryPercent: percentEntry,
      tradeSetup: chosen,
    };

    console.log(acctList);

    const response = await executeTrade(tradeOrder).then((res) => {
      return res.data;
    });
    setIsClicked(false);
    if (response.status) {
      setIsModalVisible(true);
    } else {
      setAlert(true);
      Alert.alert("Failed", response.message);
      console.log(response.message);
    }
  };

  const handleDebouncedSetValue = _.debounce((value) => {
    // Use debounced value here
    if (value == "SELL INSTANT" || value == "BUY INSTANT") {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }, 300);

  if (waiting || account === null) {
    return (
      <View
        style={{
          backgroundColor: COLORS.appBackground,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.baseContainer}>
      <Details selectCategory={selectSymbolType} />
      <View style={styles.inputcontainer}>
        <DropDownPicker
          listMode="SCROLLVIEW"
          items={tradeTypelist}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          setValue={(val) => {
            setTradeType(val);
            if (val() == "SELL INSTANT" || val() == "BUY INSTANT") {
              setEdit(false);
            } else {
              setEdit(true);
            }
          }}
          value={tradeType}
          placeholder="INSTANT BUY"
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
          ArrowDownIconComponent={DownArrow}
          dropDownContainerStyle={{
            backgroundColor: "black",
            borderColor: COLORS.darkyellow,
          }}
        />

        <Dropdown
          style={{
            backgroundColor: "#111",
            borderWidth: 1,
            borderRadius: SIZES.small - 4,
            borderColor: COLORS.darkyellow,
            width: 135,
            padding: SIZES.small - 4,
            zIndex: -1,
          }}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.placeholder}
          itemTextStyle={{
            fontFamily: FONT.bold,
            color: COLORS.darkyellow,
            backgroundColor: "#111",
          }}
          inputSearchStyle={{
            color: COLORS.white,
            borderColor: COLORS.darkyellow,
            padding: 2,
            borderRadius: SIZES.small - 4,
          }}
          iconStyle={{ backgroundColor: "#111" }}
          data={
            isCurrencies
              ? Currencies.map((item) => ({
                  label: item?.label,
                  value: item?.value,
                }))
              : Synthetics.map((item) => ({
                  label: item?.label,
                  value: item?.value,
                }))
          }
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select Asset" : "..."}
          searchPlaceholder="Search..."
          renderRightIcon={() => <DownArrow />}
          value={assetType}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setAssetType(item.value);
            setSelectedLabel(item.label);
            setIsFocus(false);
          }}
          containerStyle={{
            backgroundColor: "#111",
            borderColor: COLORS.darkyellow,
            borderRadius: SIZES.small,
          }}
          selectedTextProps={{
            style: styles.placeholder,
          }}
          activeColor="#111"
        />
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
          Attention!!: Please note that if you do not specify a volume, we would
          open each trade using the recommended volume for each account based on
          your risk management plan.
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
              updateList={updateArray}
              updateArrayForVolume={updateArrayForVolume}
              updateListForAccount={updateArrayForAccount}
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
              marginTop: SIZES.large,
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
        <TouchableOpacity
          onPress={() => {
            if (tradeAsset.length == 0) {
              Alert.alert("", "Please select a category");
            } else if (assetType.length === 0) {
              Alert.alert("", "Please select an asset to trade");
            } else if (tradeType.length === 0) {
              Alert.alert("", "Please select market position");
            } else if (acctList.length === 0) {
              Alert.alert("", "Please choose an account");
            } else if (acctList[0].tradeAmount === 0) {
              Alert.alert("", "Please choose the number of positions to place");
            } else if (!account.hasEntryStrategy) {
              setEntryAlert(true);
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
      <Toast />
      <Speech placeAudioOrder={placeVoiceOrder} />
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
          openTrade={placeOrderForTrade}
        />
      </Modal>

      <AlertModal
        isAlert={alertModal}
        handleCancel={() => {
          setAlertModal(false);
          navigation.navigate("Home");
        }}
        handleConfirm={() => {
          setAlertModal(false);
          navigation.navigate("Pricing");
        }}
        message={"Please renew your subscription to continue usage"}
        showCancelButton={true}
        showConfirmButton={true}
        title={"Action required"}
      />

      <AlertModal
        isAlert={entryAlert}
        handleCancel={() => {
          setEntryAlert(false);
          // navigation.navigate("Plan");
        }}
        handleConfirm={() => {
          setEntryAlert(false);
          placeOrderForTrade(true, false, 0);
        }}
        message={
          "You do not have a registerd entry strategy. Are you sure you want to proceed with this trade?"
        }
        showCancelButton={true}
        showConfirmButton={true}
        title={"Action required"}
      />
    </ScrollView>
  );
};

export default TradingBot;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: "#111",
  },
  placeholder: {
    color: COLORS.darkyellow,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    backgroundColor: "#111",
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
  },
  asset: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    borderRadius: SIZES.xSmall - 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
  },
  inputcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SIZES.large,
    alignItems: "center",
    width: 150,
    marginTop: SIZES.medium,
    padding: SIZES.small,
    marginLeft: SIZES.medium,
  },
  line: {
    backgroundColor: "white",
    height: 0.4,
    width: "80%",
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
  options: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    height: 30,
    width: 110,
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
    marginVertical: 30,
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
