import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SIZES } from "../constants";

const Increment = () => {
  const [numOfTrades, setNumOfTrades] = useState("");

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            setNumOfTrades(numOfTrades - 1);
        }}>
          <Image
            source={require("../assets/icons/minus.png")}
            style={styles.image}
            resizeMethod="cover"
          />
        </TouchableOpacity>
        <TextInput
          placeholder="1"
          placeholderTextColor={"white"}
          editable={true}
          numberOfLines={1}
          onChangeText={(num) => {
            setNumOfTrades(num);
            // body.entryPrice = entry;
          }}
          value={numOfTrades}
        />
        <TouchableOpacity onPress={() => {
            setNumOfTrades(numOfTrades + 1)
        }}>
          <Image
            source={require("../assets/icons/plus.png")}
            style={styles.image}
            resizeMethod="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Increment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    height: SIZES.medium,
    width: SIZES.medium,
  },
});
