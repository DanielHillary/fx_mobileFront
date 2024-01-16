import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONT, SIZES } from "../constants";
import { closeMultipleTrades } from "../api/placeTradeApi";

const CloseTrades = ({ account }) => {
  const [entry, setEntry] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const closeTrades = async () => {
    let response = await closeMultipleTrades(account.metaApiAccountId, entry).then((res) => {
      return res.data;
    })

    if(response.status){
      console.log(response.message);
    }else{
      console.log(response.message);
    }
  }

  return (
    <View>
      <View
        style={{
          alignItems: "flex-start",
          padding: SIZES.small,
          marginTop: SIZES.small
        }}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.text}>Close All</Text>
        <Text style={styles.asset}> {entry} </Text>
        <Text style={styles.text}>trades: </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: SIZES.xLarge}}>
          <TextInput
            placeholderTextColor={"gray"}
            placeholder="Enter symbol"
            numberOfLines={1}
            style={[styles.input(isFocused)]}
            onChangeText={(num) => {
              setEntry(num);
              // body.entryPrice = entry;
            }}
            value={entry}
            onFocus={() => {
              setIsFocused(true);
            }}
          />

          <TouchableOpacity
            onPress={() => {
              //   navigate("AutoTrader");
              setIsClicked(false);
              if(entry.length === 0){
                alert("please enter a symbol");
              }else{
                closeTrades();
              }
              
            }}
            style={styles.button}
          >
            {isClicked ? (
              <ActivityIndicator size="large" colors={"black"} />
            ) : (
              <Text style={styles.buttonText}>Close</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CloseTrades;

const styles = StyleSheet.create({
  text: {
    color: COLORS.lightWhite,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
  },
  asset: {
    color: COLORS.darkyellow,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold
  },
  input: (focus) => ({
    marginTop: 5,
    height: 40,
    width: 200,
    paddingLeft: 10,
    borderRadius: 10,
    color: COLORS.lightWhite,
    backgroundColor: COLORS.appBackground,
    borderColor: focus ? COLORS.darkyellow : COLORS.gray,
    borderWidth: 0.5,
    alignSelf: "center",
  }),
  button: {
    marginTop: 10,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 60,
    alignSelf: "center",
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    // textAlign: 'center',
    fontSize: SIZES.medium,
    color: "black",
    fontFamily: FONT.bold,
  },
});
