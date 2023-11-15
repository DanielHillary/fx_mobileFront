import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
import React, { useContext, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../../../context/AuthContext";

const DownArrow = () => {
  return (
    <View>
      <Image
        source={require("../../../assets/icons/dropdown.png")}
        style={{ height: 10, width: 10 }}
      />
    </View>
  );
};

const SetAlert = () => {
  const categories = [
    { label: "Synthetics", value: "Synthetics" },
    { label: "Currencies", value: "Currencies" },
  ];

  const options = [
    { label: "Email", value: "Email"},
    { label: "Push", value: "PushNotification"},
    { label: "Call", value: "Call"}
  ]

  const assetlist = [
    { label: "EUR/USD", value: "EURUSD" },
    { label: "USD/JPY", value: "USDJPY" },
    { label: "GBP/USD", value: "GBPUSD" },
    { label: "AUD/USD", value: "AUDUSD" },
    { label: "USD/CAD", value: "USDCAD" },
    { label: "GBP/JPY", value: "GBPJPY" },
    { label: "USD/CHF", value: "USDCHF" },
    { label: "EUR/GBP", value: "EURGBP" },
  ];

  const [asset, setAsset] = useState("");
  const [postion, setPosition] = useState("");
  const [isPressed, setIsPressed] = useState(true);
  const [watchPrice, setWatchPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [option, setOption] = useState(false);
  const [currentAsset, setCurrentAsset] = useState();

  const { accountInfo } = useContext(AuthContext);

  const body = {
    accountId: accountInfo.accountId,
    active: true,
    alertMedium: option,
    "alertType": "string",
    "fireBaseToken": "string",
    "forATrade": true,
    "id": 0,
    "journalId": "string",
    "metaOrderId": "string",
    "planId": 0,
    "position": "string",
    "reason": "string",
    "recurrent": true,
    "remark": "string",
    "symbol": "string",
    "symbolCategory": "string",
    "systemId": "string",
    "watchId": "string",
    "watchPrice": 0
  }
  return (
    <View style={styles.base}>
      <View style={{ paddingHorizontal: 80 }}>
        <DropDownPicker
          items={categories}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          value={currentValue}
          setValue={(val) => setCurrentValue(val)}
          placeholder="Currency"
          placeholderStyle={{ fontSize: 20, fontWeight: "bold" }}
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
      <View style={{ flexDirection: "row", margin: 15, marginLeft: 40 }}>
        <Text style={[styles.text, { marginTop: 25 }]}>When the price of</Text>
        <View style={styles.inputcontainer}>
          <DropDownPicker
            items={assetlist}
            open={isAssetOpen}
            setOpen={() => setIsAssetOpen(!isAssetOpen)}
            value={currentAsset}
            setValue={(val) => setCurrentAsset(val)}
            placeholder="EUR/USD"
            placeholderStyle={{ fontSize: 14, fontWeight: "bold" }}
            style={{
              backgroundColor: COLORS.appBackground,
              borderColor: COLORS.darkyellow,
              marginBottom: 10,
            }}
            disableBorderRadius={false}
            textStyle={{ color: COLORS.darkyellow, fontSize: 14 }}
            labelStyle={{ color: COLORS.darkyellow, fontSize: 14 }}
            // arrowIconStyle={{backgroundColor: COLORS.darkyellow}}
            ArrowDownIconComponent={DownArrow}
            dropDownContainerStyle={{
              backgroundColor: COLORS.appBackground,
              borderColor: COLORS.darkyellow,
            }}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", margin: 15, marginLeft: 40 }}>
        <Text style={styles.text}>goes</Text>
        <View style={[styles.inputcontainer, { width: 50 }]}>
          <TextInput
            placeholderTextColor={"gray"}
            placeholder="above"
            numberOfLines={1}
            style={[
              styles.input,
              {
                width: 50,
              },
            ]}
            onChangeText={(text) => setPosition(text)}
            value={postion}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", marginLeft: 70 }}>
        <View>
          <TextInput
            placeholderTextColor={"gray"}
            placeholder="1000.0"
            keyboardType="numeric"
            numberOfLines={1}
            style={[
              styles.input,
              {
                textAlign: "center",
                width: 190,
                height: 50,
                marginTop: 20,
                fontSize: SIZES.xLarge * 2,
                alignSelf: "center",
                borderBottomColor: "white",
                borderBottomWidth: 0.5,
              },
            ]}
            onChangeText={(num) => setWatchPrice(num)}
            value={watchPrice}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          marginLeft: 30,
          // width: 150,
        }}
      >
        <Text style={[styles.text]}>send me a</Text>
        <View style={{ width: 200, marginLeft: SIZES.large}}>
          <DropDownPicker
            items={options}
            open={optionOpen}
            setOpen={() => setOptionOpen(!optionOpen)}
            value={option}
            setValue={(val) => setOption(val)}
            placeholder="Push"
            placeholderStyle={{ fontSize: 20, fontWeight: "bold" }}
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
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          marginLeft: 30,
          width: 200,
        }}
      >
        <Text style={[styles.text]}>Note</Text>
        <View
          style={[
            styles.alertOptions,
            {
              height: 100,
              marginLeft: 35,
            },
          ]}
        >
          <TextInput style={{ color: COLORS.white}}/>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => setIsPressed(!isPressed)}
          style={{ marginLeft: 20, marginTop: 10 }}
        >
          <View>
            {isPressed ? (
              <Image
                source={require("../../../assets/icons/checkbox.png")}
                resizeMethod="scale"
                style={styles.image}
              />
            ) : (
              <View style={styles.checkbox} />
            )}
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 40 }}>
          <Text
            style={[styles.text, { marginLeft: 10, fontSize: SIZES.small }]}
          >
            Disable this alert once it triggers
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          //   navigate("AutoTrader");
          console.log(accountInfo.accountId);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create alert</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetAlert;

const styles = StyleSheet.create({
  base: {
    flexGrow: 1,
    backgroundColor: "#111",
  },
  text: {
    color: COLORS.lightWhite,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
  input: {
    width: 80,
    fontSize: SIZES.medium + 3,
    fontFamily: FONT.regular,
    color: COLORS.tertiary,
  },
  inputcontainer: {
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.lightWhite,
    width: 100,
    marginLeft: 8,
    height: 20,
  },
  logImage: {
    height: "25%",
    width: 30,
    resizeMode: "contain",
    alignSelf: "center",
  },
  assetCategory: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    marginVertical: 10,
    height: 40,
    width: 160,
    alignSelf: "center",
  },
  categoryText: {
    flex: 1,
    color: COLORS.darkyellow,
    fontSize: SIZES.large - 1,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 6,
    marginLeft: 13,
    width: "90%",
  },
  alertOptions: {
    backgroundColor: "black",
    width: 200,
    height: 50,
    marginLeft: 10,
    borderRadius: 8,
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
  dropdown: {
    // backgroundColor: 'gray',
    // color: "white",
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "black",
  },
});
