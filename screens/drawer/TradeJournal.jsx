import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import TradingJournal from "./TradingJournal";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { COLORS, SIZES, FONT } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TradeJournal = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [accountInfo, setAccountInfo] = useState({});
  const [waiting, setWaiting] = useState(false);

  const { accountDetails } = useContext(AuthContext);
  const navigation = useNavigation();

  const setAccountUp = async() => {
    let account = await AsyncStorage.getItem("accountInfo").then((res) => {
      return JSON.parse(res);
    })
    
    if(account === null && accountDetails === null){
      setWaiting(true);
    }
    if(accountDetails === null || accountDetails.length === 0){
      setAccountInfo(account);
      setWaiting(false)
    }else{
      setAccountInfo(accountDetails);
      setWaiting(false);
    }
    
  }

  useEffect(() => {
    setAccountUp();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setAccountUp();
    }, [accountDetails])

  );

  if(waiting || accountInfo === null){
    return (
      <View
        style={{
          backgroundColor: COLORS.appBackground,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {accountInfo.accountName != "PsyDStarter" ? (
        <TradingJournal />
      ) : (
        <View>
          <Text
            style={{
              color: COLORS.lightWhite,
              textAlign: "center",
              fontSize: SIZES.medium - 3,
              paddingHorizontal: SIZES.medium,
              marginVertical: SIZES.medium,
              marginTop: SIZES.large * 2,
              fontFamily: FONT.medium,
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
    text: {
      color: COLORS.white,
      fontFamily: FONT.bold,
      fontSize: SIZES.medium,
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
