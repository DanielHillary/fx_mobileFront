import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { executeTrade } from "../../api/placeTradeApi";

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
const accountList = [2];

const Account = ({ item }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            setIsPressed(!isPressed);
            if (isPressed) {
              accountList.push(item.id);
            } else {
              accountList.filter((value) => value !== item.id);
            }
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
        </TouchableOpacity>
        <View style={{ marginTop: 25 }}>
          <Text
            style={[styles.text, { marginLeft: 10, fontSize: SIZES.large }]}
          >
            {item.accountId}
          </Text>
          <Text style={[styles.text, { marginLeft: 10 }]}>{item.amount}</Text>
        </View>

        <View>
          <Text style={[styles.text, { marginTop: 30, marginLeft: 20 }]}>
            {item.broker}
          </Text>
        </View>
      </View>
    </View>
  );
};

const AutoTrader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [account, setAccount] = useState({});

  const getData = async () => {
    let accountDetails = await AsyncStorage.getItem("accountInfo");
    let account = JSON.parse(accountDetails);

    return account;
    // console.log(account);
  };

  useEffect(() => {
    getData().then((res) => {
      setAccount(res);
      console.log(account);
    });
  }, []);

  const route = useRoute();

  const details = route.params?.data || null;
  // console.log(details);

  const placeTradeOrder = () => {
    const tradeOrder = {
      assetCategory: details.assetCategory,
      comments: "title",
      currency: details.currency,
      lotSize: details.lotSize,
      metaAccountId: account.metaApiAccountId,
      numberOfTradesToExecute: 1,
      stopLossPrice: details.stopLossPrice,
      strategy: "SF",
      symbol: details.asset,
      takeProfitPrice: details.takeProfitPrice,
      tradeType: details.tradeType == "BUY" ? "BUY INSTANT" : "SELL INSTANT",
      tradingPlanId: account.planId,
      userAccountId: account.accountId,
      userAccountIds: accountList,
    };

    console.log(tradeOrder);

    const response = executeTrade(tradeOrder);

    console.log(response);
  };

  const data = [
    {
      accountId: "32223311",
      id: 1,
      amount: "$3045.30",
      broker: "New-York",
    },
    {
      accountId: "23232323",
      id: 2,
      amount: "$250.34",
      broker: "Exness-Angeles",
    },
    {
      accountId: "232443434",
      id: 3,
      amount: "$35,050.45",
      broker: "Chicago-HFX",
    },
  ];

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
  ];
  return (
    <ScrollView style={styles.baseContainer}>
      <Text style={[styles.text, { marginLeft: 30 }]}>
        Choose trading account(s)
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Account item={item} />}
        keyExtractor={(item) => item?.accountId}
        contentContainerStyle={{ rowGap: SIZES.medium }}
        vertical
        showsHorizontalScrollIndicator={false}
      />

      <View
        style={{
          flexDirection: "row",
          padding: 20,
          gap: 15,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Number of trades</Text>
        <TextInput
          placeholder="1"
          value={value}
          keyboardType="numeric"
          placeholderTextColor={COLORS.lightWhite}
          numberOfLines={1}
          multiline={false}
          style={styles.input}
          onTextInput={(val) => {
            setValue(val);
          }}
        />
      </View>

      <View style={styles.inputcontainer}>
        <DropDownPicker
          items={typelist}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          value={tradeType}
          setValue={(val) => setTradeType(val)}
          placeholder="BUY"
          placeholderStyle={{ fontSize: 14, fontWeight: "bold" }}
          style={{
            backgroundColor: "#111",
            borderColor: COLORS.darkyellow,
            marginBottom: 10,
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
      </View>

      <TouchableOpacity
        onPress={() => {
          //   navigate("AutoTrader");
          placeTradeOrder();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
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
  inputcontainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignSelf: "center",
    width: 150,
    marginBottom: 50,
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
    marginLeft: 25,
    marginTop: 30,
  },
  image: {
    height: 15,
    width: 15,
    marginLeft: 25,
    marginTop: 30,
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
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 60,
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
