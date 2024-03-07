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
  Alert,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS, Currencies, FONT, SIZES, Synthetics } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { createAxiosInstance } from "../../api/axios.config";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

const AlertModal = ({
  title,
  isAlert,
  handleConfirm,
  handleCancel,
  showCancelButton = true,
}) => {
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
  const [assetValue, setAssetValue] = useState("");
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
  const [accountInfo, setAccountInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [accountBalance, setAccountBalance] = useState("");
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [isCurrencies, setIsCurrencies] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [cIsFocus, setCIsFocus] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const { accountDetails } = useContext(AuthContext);

  const setAccountUp = async() => {
    let account = await AsyncStorage.getItem("accountInfo").then((res) => {
      return JSON.parse(res);
    })
    
    if(account === null && accountDetails === null){
      setWaiting(true);
    }
    if(accountDetails === null || accountDetails.length === 0){
      setAccountInfo(account);
      setBalance(account.accountBalance);
      setWaiting(false);
    }else{
      setAccountInfo(accountDetails);
      setBalance(accountDetails.accountBalance);
      setWaiting(false);
    }
    
  }

  useEffect(() => {
    setAccountUp();
  }, []);

  const inputRef = useRef(null);

  

  const checkCat = () => {
    const body = {
      entryPrice: entry,
      lotSize: volume,
      stopLossPrice: stopLoss,
      takeProfitPrice: takeProfit,
      accountBalance: balance,
      currency: "USD",
      assetCategory: assetType,
      symbol: assetValue,
      assetAbbrev: selectedLabel,
      tradingPlanId: accountInfo.planId || null,
      userAccountId: accountInfo.accountId,
    };

    let check = false;
    if (body.assetCategory == "") {
      check = true;
    }
    return check;
  };

  useFocusEffect(
    React.useCallback(() => {
      setAccountUp();
    }, [accountDetails])
  );

  const checkField = () => {
    let check = false;

    const body = {
      entryPrice: entry,
      lotSize: volume,
      stopLossPrice: stopLoss,
      takeProfitPrice: takeProfit,
      accountBalance: balance,
      currency: "USD",
      assetCategory: assetType,
      symbol: assetValue,
      assetAbbrev: selectedLabel,
      tradingPlanId: accountInfo.planId || null,
      userAccountId: accountInfo.accountId,
  
    };
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
  };

  const postAPI = async () => {
    const body = {
      entryPrice: entry,
      lotSize: volume,
      stopLossPrice: stopLoss,
      takeProfitPrice: takeProfit,
      accountBalance: balance,
      currency: "USD",
      assetCategory: assetType,
      symbol: assetValue,
      assetAbbrev: selectedLabel,
      tradingPlanId: accountInfo.planId || null,
      userAccountId: accountInfo.accountId,
  
    };
    setIsClicked(true);
    let response = {
      status: false,
    };
    if (body.assetCategory == "") {
      setCheckCategory(true);
      return response;
    } else {
      try {
        const apiAxios = await createAxiosInstance();
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


  if (waiting || accountInfo === null) {
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

  return (
    <ScrollView style={styles.base}>
      <Text style={styles.baseText}>Risk Analyzer</Text>
      <Text style={styles.desc}>
        Our Risk Analyzer don't just calculate the figures for you. We give you
        insight into the trade you are about to take from the safety of your
        trading plan.
      </Text>

      <View style={{ paddingHorizontal: 80, marginTop: 30 }}>
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
          data={categories.map((item) => ({
            label: item?.label,
            value: item?.value,
          }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!cIsFocus ? "Select Category" : "..."}
          searchPlaceholder="Search..."
          renderRightIcon={() => <DownArrow />}
          value={assetType}
          onFocus={() => setCIsFocus(true)}
          onBlur={() => setCIsFocus(false)}
          onChange={(item) => {
            setAssetType(item.value);
            if (item.value == "Synthetic") {
              setIsCurrencies(false);
            } else {
              setIsCurrencies(true);
            }
            setCIsFocus(false);
          }}
          containerStyle={{
            backgroundColor: "#111",
            borderColor: COLORS.darkyellow,
            borderRadius: SIZES.small,
          }}
        />
      </View>

      <View>
        <View style={styles.infocontainer}>
          <View style={styles.infoEntry}>
            {/* <Text style={{ color: "white", width: 80 }}>Asset/Symbol</Text> */}

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
              value={assetValue}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setAssetValue(item.value);
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
              // itemContainerStyle={{backgroundColor: "black"}}
            />
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
              }}
              value={takeProfit}
            />
            <View style={styles.line} />
          </View>
        </View>

        <View style={styles.infocontainer}>
          <View style={styles.infoEntry}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: 120,
              }}
            >
              <Text style={{ color: "white", width: 80 }}>Act balance</Text>
              <TouchableOpacity
                onPress={() => {
                  setEditMode(!editMode);
                  inputRef.current?.focus();
                }}
              >
                <Image
                  source={require("../../assets/icons/EditFirst.png")}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              {editMode ? (
                <TextInput
                  ref={inputRef}
                  editable={true}
                  placeholderTextColor={"gray"}
                  numberOfLines={1}
                  keyboardType="numeric"
                  style={[styles.input, { marginTop: 4 }]}
                  onChangeText={(text) => {
                    setBalance(text);
                  }}
                  value={balance}
                  selection={{
                    start: balance.length,
                    end: balance.length,
                  }}
                />
              ) : (
                <Text style={styles.textInput}>{balance}</Text>
              )}
            </View>
            <View style={styles.lineText(editMode)} />
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
            if (checkCat()) {
              Alert.alert("", "Please choose a category");
            } else if (checkField()) {
              Alert.alert(
                "",
                "Please enter valid details in the field provided"
              );
            } else if (assetValue.length === 0) {
              Alert.alert("", "Please choose an asset to analyze");
            } else {
              postAPI().then((res) => {
                setIsClicked(false);
                if (res.status) {
                  // console.log(res.data);
                  navigate("RiskAnalysis", { data: res.data });
                } else {
                  console.log(res.message);
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
    </ScrollView>
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
  placeholder: {
    color: COLORS.darkyellow,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    backgroundColor: "#111",
  },
  alertContainer: {
    backgroundColor: "black",
  },
  baseText: {
    color: COLORS.lightWhite,
    padding: 5,
    marginHorizontal: 15,
    fontSize: SIZES.large * 1.5,
    fontFamily: FONT.bold,
  },

  desc: {
    color: COLORS.lightWhite,
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.medium,
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
    width: "45%",
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
  lineText: (edit) => ({
    backgroundColor: !edit ? "white" : COLORS.darkyellow,
    height: 0.5,
    width: "80%",
    marginTop: edit ? 1 : 3,
  }),
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
  textInput: {
    color: COLORS.white,
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    marginTop: SIZES.small,
    // padding: SIZES.medium,
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
