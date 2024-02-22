import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import TradingJournal from "./TradingJournal";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, FONT } from "../../constants";

const TradeJournal = () => {
  const [isClicked, setIsClicked] = useState(false);

  const { accountDetails } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {accountDetails.accountName != "PsyDStarter" ? (
        <TradingJournal />
      ) : (
        <View>
          <Text
            style={{
              color: COLORS.lightWhite,
              textAlign: "center",
              fontSize: SIZES.medium - 5,
              paddingHorizontal: SIZES.medium,
              marginVertical: SIZES.medium,
              marginTop: SIZES.large * 2,
            }}
          >
            Please register a real trading account in order able to use this
            feature and view your trade records.
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddNewAccount");
            }}
            style={styles.button}
          >
            {isClicked ? (
              <ActivityIndicator size="large" colors={"black"} />
            ) : (
              <Text style={styles.buttonText}>Register an account</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TradeJournal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.appBackground,
    },
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 30,
    marginBottom: 40,
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
