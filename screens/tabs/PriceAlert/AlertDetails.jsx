import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { disableAsset } from "../../../api/priceAlertApi";
import AwesomeAlert from "react-native-awesome-alerts";

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
        title={"Please check"}
        titleStyle={styles.title}
        contentContainerStyle={styles.alertContainer}
        showConfirmButton={showConfirmButton}
        showCancelButton={showCancelButton}
        cancelButtonColor={COLORS.darkyellow}
        cancelButtonTextStyle={styles.alertText}
        cancelText="Cancel"
        confirmButtonColor={COLORS.darkyellow}
        confirmButtonTextStyle={styles.alertText}
        confirmText="Continue"
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

const AlertDetails = () => {
  const [asset, setAsset] = useState("");
  const [postion, setPosition] = useState("");
  const [isPressed, setIsPressed] = useState(true);
  const [watchPrice, setWatchPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [currentAsset, setCurrentAsset] = useState();
  const [check, setCheck] = useState(false);

  const route = useRoute();

  const navigation = useNavigation();

  const alert = route.params?.alertDetails || null;
  const history = route.params?.fromHistory || null;

  const disableAlert = async () => {
    try {
      const response = await disableAsset(alert.id).then((res) => {
        return res.data;
      });
      if (response.status) {
        navigation.goBack();
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.base}>
      <Text style={[styles.text, { alignSelf: "flex-end" }]}>
        {alert.openTime}
      </Text>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <Text style={[styles.text, { marginTop: 6 }]}>When the price of</Text>
        <Text style={styles.asset}>{`  ${alert.symbol}`}</Text>
      </View>

      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <Text style={[styles.text, { marginTop: 6 }]}>goes</Text>
        <Text style={styles.asset}>{`  ${alert.position}`}</Text>
      </View>

      <View
        style={{
          alignSelf: "center",
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.white,
        }}
      >
        <Text style={[styles.text, { fontSize: SIZES.large * 2 }]}>
          {alert.watchPrice}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          width: 150,
        }}
      >
        <Text style={[styles.text, { marginTop: 6 }]}>send me</Text>
        <Text style={styles.asset}> an Email</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          width: 100,
        }}
      >
        <Text style={[styles.text]}>Note</Text>
        <View
          style={[
            styles.alertOptions,
            {
              height: 70,
              marginLeft: 15,
            },
          ]}
        >
          <Text style={[styles.text, { padding: 7, fontSize: SIZES.small }]}>
            {alert.remark}
          </Text>
        </View>
      </View>

      {/* conditionally render this guy based on the alert details */}

      <View style={{ flexDirection: "row" }}>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

        {/* <View style={{ marginTop: 40 }}>
          <Text
            style={[styles.text, { marginLeft: 10, fontSize: SIZES.small }]}
          >
            Disable this alert once it triggers.
          </Text>
        </View> */}
      </View>
      {!history && <TouchableOpacity
        onPress={() => {
          setCheck(true);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Disable this alert</Text>
      </TouchableOpacity>}
      <AlertModal
        isAlert={check}
        showCancelButton={true}
        showConfirmButton={true}
        message={
          "Alert will be removed from watchlist. Are you sure you want to diable this alert?"
        }
        handleCancel={() => {
          setCheck(false);
        }}
        handleConfirm={() => {
          setCheck(false);
          disableAlert();
        }}
      />
    </View>
  );
};

export default AlertDetails;

const styles = StyleSheet.create({
  base: {
    flexGrow: 1,
    backgroundColor: "#111",
    paddingHorizontal: SIZES.medium + 4,
  },
  asset: {
    color: COLORS.darkyellow,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginTop: 7,
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
    width: 150,
    marginLeft: 8,
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
  optionText: {
    fontFamily: FONT.regular,
    color: COLORS.white,
    fontSize: SIZES.medium + 3,
    margin: 5,
  },
  alertMessage: {
    color: COLORS.white,
    textAlign: "center",
  },
  alertText: {
    color: "black",
    fontFamily: FONT.bold,
  },
  alertContainer: {
    backgroundColor: "black",
    borderRadius: SIZES.medium,
    width: 200,
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
