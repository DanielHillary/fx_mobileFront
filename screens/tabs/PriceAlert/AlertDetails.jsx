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
import { useNavigation } from "@react-navigation/native";

const AlertDetails = () => {
  const [asset, setAsset] = useState("");
  const [postion, setPosition] = useState("");
  const [isPressed, setIsPressed] = useState(true);
  const [watchPrice, setWatchPrice] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAssetOpen, setIsAssetOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [currentAsset, setCurrentAsset] = useState();
  return (
    <View style={styles.base}>
      <View style={{ flexDirection: "row", margin: 15, marginLeft: 40 }}>
        <Text style={[styles.text, { marginTop: 25 }]}>When the price of</Text>
        <View style={styles.inputcontainer}></View>
      </View>

      <View style={{ flexDirection: "row", margin: 15, marginLeft: 40 }}>
        <Text style={styles.text}>goes</Text>
        <View style={[styles.inputcontainer, { width: 50 }]}></View>
      </View>

      <View style={{ alignSelf: "center" }}>
        <Text style={[styles.text, { fontSize: SIZES.large * 2 }]}>
          $12,323
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          marginLeft: 40,
          width: 150,
        }}
      >
        <Text style={[styles.text]}>send me</Text>
        <View style={styles.alertOptions}></View>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          marginLeft: 40,
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
        ></View>
      </View>

      {/* conditionally render this guy based on the alert details */}

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
            Disable this alert once it triggers.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          //   navigate("AutoTrader");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Disable this alert</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlertDetails;

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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightWhite,
    width: 100,
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
