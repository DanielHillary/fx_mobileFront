import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    Image,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { COLORS, FONT, SIZES } from "../../constants";
  
  const SuccessRegModal = ({ setVisibility, nexPage }) => {
    return (
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={{ alignItems: "center", marginTop: SIZES.xxLarge }}>
            <Image
              source={require("../../assets/icons/good.png")}
              style={{ height: 50, width: 50 }}
            />
            <Text style={styles.note}>Transaction Successful</Text>
  
            <TouchableOpacity
              onPress={() => {
                setVisibility(false);
                nexPage();
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  export default SuccessRegModal;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
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
    modal: {
      backgroundColor: "#09181C",
      height: 250,
      width: "100%",
    },
    button: {
      // margin: 80,
      height: 40,
      backgroundColor: COLORS.darkyellow,
      borderRadius: 10,
      width: 250,
      marginTop: 50,
      marginBottom: 20,
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
  