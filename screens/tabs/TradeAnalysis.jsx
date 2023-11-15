import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";
import React from "react";
import { useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import apiAxios from "../../api/axios.config";
import AwesomeAlert from "react-native-awesome-alerts";

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

const AlertModal = ({ title, isAlert, handleConfirm, handleCancel, showCancelButton = true }) => {
  return (
    <View>
      <AwesomeAlert
        show={isAlert}
        title={title}
        titleStyle={styles.title}
        contentContainerStyle={styles.alertContainer}
        showConfirmButton={true}
        showCancelButton={showCancelButton}
        onCancelPressed={handleCancel}
        onConfirmPressed={handleConfirm}
        closeOnTouchOutside={true}
        onDismiss={handleCancel}
      />
    </View>
  );
};

const TradeAnalysis = ({ screenProps }) => {
  const [value, setAssetValue] = useState("");
  const [entry, setEntry] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [balance, setBalance] = useState("");
  const [volume, setVolume] = useState("");
  const [currency, setCurrency] = useState("");
  const [assetType, setAssetType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isCheckField, setIsCheckField] = useState(false);
  const [checkCategory, setCheckCategory] = useState(false);
  const [forError, setForError] = useState(false);

  const body = {
    entryPrice: entry,
    lotSize: volume,
    stopLossPrice: stopLoss,
    takeProfitPrice: takeProfit,
    accountBalance: 10000,
    currency: "USD",
    assetCategory: assetType,
    symbol: value,
    tradingPlanId: 1
  };

  const checkCat = (body = {}) => {
    let check = false;
      if (body.assetCategory == "") {
        check = true;
      } 
    return check;
  };

  const checkField = (body = {}) => {
    let check = false;
    if (
      body.entryPrice == "" ||
      body.stopLossPrice == "" ||
      body.takeProfitPrice == "" ||
      body.lotSize == "" ||
      body.accountBalance == ""
    ) {
      check = true;
    }
    return check;
  }

  const postAPI = async () => {
    let response = {
      status: false,
    };
    if (body.assetCategory == "") {
      setCheckCategory(true);
      return response;
    } else {
      try {
        const { data } = await apiAxios.post("/calculate", body);
        // console.log(data.data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { navigate } = useNavigation();

  const categories = [
    { label: "Synthetics", value: "Synthetic" },
    { label: "Currencies", value: "Currencies" },
  ];

  return (
    <View style={styles.base}>
      <Text style={styles.baseText}>Risk Analyzer</Text>
      <Text style={styles.desc}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s
      </Text>

      <View style={{ paddingHorizontal: 80, marginTop: 30 }}>
        <DropDownPicker
          items={categories}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          value={assetType}
          setValue={(val) => {
            setAssetType(val);
            body.assetCategory = assetType;
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

      <View>
        <View style={styles.infocontainer}>
          <View style={styles.infoEntry}>
            <Text style={{ color: "white", width: 80 }}>Asset/Symbol</Text>

            <TextInput
              placeholderTextColor={"gray"}
              placeholder="v10 Index"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => {
                setAssetValue(text);
                body.symbol = value;
              }}
              value={value}
            />
            <View style={styles.line} />
          </View>
          <View style={[styles.infoEntry, { marginLeft: 15 }]}>
            <Text style={{ color: "white", width: 80 }}>Entry</Text>

            <TextInput
              placeholderTextColor={"gray"}
              placeholder="0.0000"
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(num) => {
                setEntry(num);
                body.entryPrice = entry;
              }}
              value={entry}
            />
            <View style={styles.line} />
          </View>
        </View>

        <View style={styles.infocontainer}>
          <View style={styles.infoEntry}>
            <Text style={{ color: "white", width: 80 }}>Stop Loss</Text>

            <TextInput
              placeholderTextColor={"gray"}
              placeholder="0.0000"
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              // onPressIn={() => setLossFocus(true)}
              onChangeText={(text) => {
                setStopLoss(text);
                body.stopLossPrice = stopLoss;
              }}
              value={stopLoss}
            />
            <View style={styles.line} />
          </View>
          <View style={[styles.infoEntry, { marginLeft: 15 }]}>
            <Text style={{ color: "white", width: 80 }}>Take Profit</Text>

            <TextInput
              placeholderTextColor={"gray"}
              placeholder="0.0000"
              numberOfLines={1}
              keyboardType="numeric"
              style={[styles.input]}
              onChangeText={(text) => {
                setTakeProfit(text);
                body.takeProfitPrice = takeProfit;
              }}
              value={takeProfit}
            />
            <View style={styles.line} />
          </View>
        </View>

        <View style={styles.infocontainer}>
          <View style={styles.infoEntry}>
            <Text style={{ color: "white", width: 80 }}>Act balance</Text>

            <TextInput
              editable={true}
              placeholderTextColor={"gray"}
              placeholder="10,000"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => setBalance(text)}
              value={balance}
            />
            <View style={styles.line} />
          </View>
          <View style={[styles.infoEntry, { marginLeft: 15 }]}>
            <Text style={{ color: "white", width: 80 }}>Volume</Text>
            <TextInput
              placeholderTextColor={"gray"}
              placeholder="0.0000"
              keyboardType="numeric"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => setVolume(text)}
              value={volume}
            />
            <View style={styles.line} />
          </View>
        </View>

        <View style={styles.infocontainer}>
          <View style={styles.infoEntry}>
            <Text style={{ color: "white", width: 80 }}>Currency</Text>

            <TextInput
              placeholderTextColor={"gray"}
              placeholder="USD"
              numberOfLines={1}
              style={[styles.input]}
              onChangeText={(text) => setCurrency(text)}
              value={currency}
            />
            <View style={styles.line} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsClicked(true);
            if (checkCat(body)) {
              setCheckCategory(true);
            }else if (checkField(body)) {
              setIsCheckField(true);
            } else {
              postAPI().then((res) => {
                setIsClicked(false);
                if (res.status) {
                  // console.log(res.data);
                  navigate("RiskAnalysis", { data: res.data });
                }
              });
            }
          }}
          style={styles.button}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText}>Calculate</Text>
          )}
        </TouchableOpacity>
      </View>

      <AlertModal
        title={"Check trade"}
        isAlert={isCheckField}
        handleCancel={() => {
          setIsClicked(false);
          setIsCheckField(false);
        }}
        handleConfirm={() => {
          // postAPI().then((res) => {
          //   setIsClicked(false);
          //   if (res.status) {
          //     navigate("RiskAnalysis", { data: res.data });
          //   }
          // });
          setIsClicked(false);
          setIsCheckField(false);
        }}
        showCancelButton={false}
      />
      <AlertModal
        title={"Asset Category"}
        isAlert={checkCategory}
        handleCancel={() => {
          setIsClicked(false);
          setCheckCategory(false);
        }}
        handleConfirm={() => {
          setCheckCategory(false);
          setIsClicked(false);
        }}
        showCancelButton={false}
      />
      <AlertModal
        title={"Error"}
        isAlert={forError}
        handleCancel={() => {}}
        handleConfirm={() => {}}
      />
    </View>
  );
};

export default TradeAnalysis;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: "#111",
  },
  title: {
    color: COLORS.darkyellow,
  },
  alertContainer: {
    backgroundColor: "black",
  },
  baseText: {
    color: COLORS.lightWhite,
    padding: 5,
    marginHorizontal: 15,
    fontSize: SIZES.large + 5,
    fontWeight: "500",
  },

  desc: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium - 2,
    fontWeight: "300",
    width: "80%",
    paddingLeft: 5,
    marginHorizontal: 15,
  },
  assetCategory: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    marginTop: 45,
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
  logImage: {
    height: "25%",
    width: 30,
    resizeMode: "contain",
    alignSelf: "center",
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
    width: 120,
  },
  infocontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    width: "auto",
  },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 70,
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
