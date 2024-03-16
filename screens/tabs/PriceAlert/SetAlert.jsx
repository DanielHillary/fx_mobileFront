import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { COLORS, Currencies, FONT, SIZES, Synthetics } from "../../../constants";
import React, { useContext, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAlert } from "../../../api/priceAlertApi";
import SuccessModal from "../../../components/modal/SuccessModal";
import AlertModal from "../../../components/modal/AlertModal";

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
    { label: "Synthetics", value: "Synthetic" },
    { label: "Currencies", value: "Currencies" },
  ];

  const options = [
    { label: "Email", value: "Email" },
    { label: "Push Notification", value: "PushNotification" },
    { label: "Call", value: "Call" },
  ];

  const positions = [
    { label: "above", value: "above" },
    { label: "below", value: "below" },
  ];

  const [asset, setAsset] = useState("");
  const [positionOpen, setPositionOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [isPressed, setIsPressed] = useState(true);
  const [watchPrice, setWatchPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [option, setOption] = useState(false);
  const [currentAsset, setCurrentAsset] = useState();
  const [accountInfo, setAccountInfo] = useState({});
  const [isCurrencies, setIsCurrencies] = useState(false);
  const [note, setNote] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertModal, setAlertModal] = useState(false);

  const { accountDetails, userInfo } = useContext(AuthContext);

  const setVisibility = (val) => {
    setIsModalVisible(val);
  }

  const getAccountInfo = async () => {
    const account = AsyncStorage.getItem("accountInfo").then((res) => {
      return JSON.parse(res);
    });
    setAccountInfo(account);
  };
  useEffect(() => {
    getAccountInfo();
  }, []);

  const body = {
    accountId: accountDetails.accountId,
    active: true,
    alertMedium: option,
    fireBaseToken: userInfo.user.firebaseToken,
    forATrade: false,
    planId: accountDetails.planId,
    position: position,
    reason: "Price alert",
    recurrent: !isPressed,
    remark: note,
    symbol: currentAsset,
    subject: "PriceAlert",
    symbolCategory: isCurrencies ? "Currencies" : "Synthetic",
    watchPrice: watchPrice,
    forProfit: true,
  };

  const addToWatchList = async() =>{
    setIsLoading(true)
    try{
      const response = await createAlert(body).then((res) => {
        return res.data;
      })
      if(response.status){
        setIsModalVisible(true);
      }else{
        setAlertModal(true)
        setMessage(response.message);
      }
    }catch(error){
      console.log(error);
    }
    setIsLoading(false);
  }
  return (
    <ScrollView style={styles.base}>
      <View style={{ paddingHorizontal: 80 }}>
        <DropDownPicker
          listMode="SCROLLVIEW"
          items={categories}
          open={isOpen}
          setOpen={() => setIsOpen(!isOpen)}
          value={currentValue}
          setValue={(val) => {
            setCurrentValue(val)
            if(val() == "Synthetic"){
              setIsCurrencies(false);
            }else {
              setIsCurrencies(true);
            }
          }}
          placeholder="Synthetics"
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
            listMode="SCROLLVIEW"
            items={isCurrencies ? Currencies : Synthetics}
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
              zIndex: -1,
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

      <View
        style={{
          flexDirection: "row",
          margin: 15,
          marginLeft: 40,
          alignItems: "center",
          height: 50,
        }}
      >
        <Text style={[styles.text, { alignSelf: "flex-end" }]}>goes</Text>

        <View style={styles.inputcontainer}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            items={positions}
            open={positionOpen}
            setOpen={() => setPositionOpen(!positionOpen)}
            value={position}
            setValue={(val) => setPosition(val)}
            placeholder="above"
            placeholderStyle={{ fontSize: 14, fontWeight: "bold" }}
            style={{
              backgroundColor: COLORS.appBackground,
              borderColor: COLORS.darkyellow,
              marginBottom: 10,
              zIndex: -1,
              width: 80,
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
                width: 190,
                height: 50,
                marginTop: 20,
                fontSize: SIZES.xLarge * 1.5,
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
        <View style={{ width: "60%", marginLeft: SIZES.large }}>
          <DropDownPicker
            listMode="SCROLLVIEW"
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
              zIndex: -1,
              width: "auto",
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
              height: 70,
              marginLeft: 35,
            },
          ]}
        >
          <TextInput
            placeholder="Comments on alert"
            placeholderTextColor={"gray"}
            multiline
            style={{
              color: COLORS.white,
              fontFamily: FONT.medium,
              paddingHorizontal: SIZES.small - 4,
              height: '50%',
            }}
            onChangeText={(num) => setNote(num)}
            value={note}
          />
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
          console.log(accountDetails.accountId);
          addToWatchList()
        }}
        style={styles.button}
      >
        {isLoading ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText}>Calculate</Text>
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

      <AlertModal 
        isAlert={alertModal}
        handleCancel={() => {
          navigation.goBack();
        }}
        handleConfirm={() => {
          navigation.navigate("Pricing");
        }}
        message={message}
        showCancelButton={true}
        showConfirmButton={true}
        title={"Action required"}
      />
    </ScrollView>
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
