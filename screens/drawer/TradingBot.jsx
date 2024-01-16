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
import { ScrollView } from "react-native-gesture-handler";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { executeAdvancedOrder, executeTrade } from "../../api/placeTradeApi";
import Toast from "react-native-toast-message";
import _ from "lodash";
import { getAllUserAccounts } from "../../api/accountApi";
import { AuthContext } from "../../context/AuthContext";

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
  const [assetType, setAssetType] = useState(false);

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
      <DropDownPicker
          listMode="SCROLLVIEW"
          items={categories}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          value={assetType}
          setValue={(val) => {
            setAssetType(val);
            selectCategory(val());
          }}
          placeholder="Please choose"
          placeholderStyle={{ fontSize: 20, fontWeight: "300" }}
          style={{
            backgroundColor: "#111",
            borderColor: COLORS.darkyellow,
            marginBottom: 10,
          }}
          disableBorderRadius={false}
          textStyle={{ color: COLORS.darkyellow, fontSize: 20 }}
          labelStyle={{ color: COLORS.darkyellow, fontSize: 20 }}
          // arrowIconStyle={{backgroundColor: COLORS.darkyellow}}
          ArrowDownIconComponent={DownArrow}
          dropDownContainerStyle={{
            backgroundColor: "#111",
            borderColor: COLORS.darkyellow,
          }}
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
          style={{ marginBottom: 20 }}
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
            ${item.accountBalance}
          </Text>
          <Text style={[styles.text, { fontSize: SIZES.small }]}>
            {item.server}
          </Text>
        </View>

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
              marginLeft: 5,
            }}
          >
            Vol
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
  // const [totalTrades, setTotalTrades] = useState(0);

  const { accountDetails, userInfo } = useContext(AuthContext);

  const [acctList, setAcctList] = useState([]);

  const selectSymbolType = (value) => {
    setTradeAsset(value);
    if (value == "Currencies") {
      setIsCurrencies(true);
    } else {
      setIsCurrencies(false);
    }
  };

  const updateArrayForAccount = (id, isPart) => {
    const alreadyExists = acctList.findIndex((obj) => obj.accountId === id);

    if (alreadyExists !== -1) {
      if (isPart) {
        acctList[alreadyExists] = {
          ...acctList[alreadyExists],
          accountId: id,
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

  const getUserAccounts = async () => {
    const response = await getAllUserAccounts(accountDetails.userId).then(
      (res) => {
        return res.data;
      }
    );
    if (response.status) {
      setUserAccounts(response.data.accountList);
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    setAccount(accountDetails);
    getUserAccounts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setAcctList([]);
    }, [])
  );

  const navigation = useNavigation();

  const placeTradeOrder = async () => {
    const tradeOrder = {
      assetCategory: "Synthetic",
      comments: "title",
      lotSize: 1,
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
    };

    console.log(tradeOrder);

    const response = await executeAdvancedOrder(tradeOrder).then((res) => {
      return res.data;
    });

    setIsClicked(false);
    if (response.status) {
      Toast.show({
        type: "success",
        text1: "Successful Trade",
        text2: "Go to Dashboard to see your trades",
      });
    } else {
      setAlert(true);
      // return (
      //   <View>
      //     <Text>Something went wrong</Text>
      //   </View>
      // );
      console.log(response.message);
    }
    // console.log(response);
  };

  const handleDebouncedSetValue = _.debounce((value) => {
    // Use debounced value here
    if (value == "SELL INSTANT" || value == "BUY INSTANT") {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }, 300);

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
        <DropDownPicker
          listMode="SCROLLVIEW"
          items={isCurrencies ? Currencies : Synthetics}
          open={isAssetOpen}
          setOpen={() => setIsAssetOpen(!isAssetOpen)}
          value={assetType}
          setValue={(val) => {
            setAssetType(val);
          }}
          placeholder={isCurrencies ? "EURUSD" : "Step Index"}
          placeholderStyle={{ fontSize: SIZES.large, fontWeight: "bold" }}
          style={{
            backgroundColor: "#111",
            borderColor: COLORS.darkyellow,
            height: 30,
            zIndex: -1,
          }}
          dropDownDirection="bottom"
          disableBorderRadius={false}
          textStyle={{ color: COLORS.darkyellow, fontSize: SIZES.large }}
          labelStyle={{ color: COLORS.darkyellow, fontSize: SIZES.large }}
          // arrowIconStyle={{backgroundColor: COLORS.darkyellow}}
          ArrowDownIconComponent={DownArrow}
          dropDownContainerStyle={{
            backgroundColor: "black",
            height: 300,
            borderColor: COLORS.darkyellow,
          }}
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
      <Text style={[styles.text, { marginLeft: 30, marginTop: SIZES.medium }]}>
        Choose trading account(s)
      </Text>
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
        Attention!!: Please note that if you do not specify a volume, we would open each trade using the
        recommended volume for each account based on your risk management plan
      </Text>
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

      <TouchableOpacity
        onPress={() => {
          //   navigate("AutoTrader");
          setIsClicked(true);
          placeTradeOrder();
        }}
        style={styles.button}
      >
        {isClicked ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Place Order</Text>
        )}
      </TouchableOpacity>
      <Toast />
    </ScrollView>
  );
};

export default TradingBot;

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
