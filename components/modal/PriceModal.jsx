import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONT } from "../../constants";
import React, { useRef, useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { Paystack, paystackProps } from "react-native-paystack-webview";

const PriceModal = ({ setVisibility, accountInfo }) => {

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text
          style={[
            styles.text,
            { padding: SIZES.small, fontSize: SIZES.medium - 4 },
          ]}
        >
          Please choose one package
        </Text>
        <View
          style={{
            alignItems: "center",
            marginTop: SIZES.large,
            gap: SIZES.medium + 6,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setVisibility(false);
            }}
            style={styles.choose}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.optionText}>Bronze Package</Text>
              <Text style={styles.optionText}>$10</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: SIZES.medium,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setVisibility(false);
                
              }}
              style={styles.choose}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.optionText}>Gold Package</Text>
                <Text style={styles.optionText}>$15</Text>
              </View>
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { fontStyle: "italic", fontSize: SIZES.medium - 5 },
              ]}
            >
              {" "}
              Most popular choice...
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setVisibility(false);
          }}
        >
          <Text style={styles.buttontext}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default PriceModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    color: COLORS.darkyellow,
    fontSize: SIZES.xSmall,
    fontFamily: FONT.regular,
  },
  optionText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    margin: SIZES.small,
  },
  note: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginTop: SIZES.medium,
  },
  buttonStyle: {
    backgroundColor: COLORS.darkyellow,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    width: 200,
    margin: SIZES.small,
    marginTop: SIZES.large * 2,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    padding: SIZES.small,
  },
  buttontext: {
    color: "black",
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
  modal: {
    backgroundColor: "#09181C",
    height: 280,
    width: "100%",
    borderRadius: SIZES.medium,
  },
  choose: {
    borderColor: COLORS.darkyellow,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    width: 200,
    alignSelf: "flex-start",
    marginLeft: SIZES.medium,
  },
});
