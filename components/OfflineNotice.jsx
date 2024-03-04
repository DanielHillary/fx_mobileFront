import { StyleSheet, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import React from "react";
import { COLORS } from "../constants";

const OfflineNotice = () => {
  NetInfo.fetch().then((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });
  return (
    <View style={styles.container}>
      <Text style={{color: COLORS.white}}>OfflineNotice</Text>
    </View>
  );
};

export default OfflineNotice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.appBackground,
    }
});
