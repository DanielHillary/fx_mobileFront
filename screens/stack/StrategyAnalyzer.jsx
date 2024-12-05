import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES, FONT } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import { analyzeTradingPlan } from "../../api/tradingplanApi";
import { useNavigation } from "@react-navigation/native";
import { NumberFormatBase, NumericFormat } from "react-number-format";

const StrategyAnalyzer = () => {
  const [isEFocused, setIsEFocused] = useState(false);
  const [isNFocused, setIsNFocused] = useState(false);
  const [isPNFocused, setIsPNFocused] = useState(false);
  const [isUNFocused, setIsUNFocused] = useState(false);
  const [isTPFocused, setIsTPFocused] = useState(false);
  const [profitProbability, setProfitProbability] = useState("");
  const [lossExitProbability, setLossExitProbability] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [averageDailyTrade, setAverageDailyTrade] = useState(0);
  const [targetProfit, setTargetProfit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { accountDetails } = useContext(AuthContext);

  const navigation = useNavigation();

  const analyzeStrategy = async () => {

    if (targetProfit == 0) {
      Alert.alert(
        "Please fill",
        "Please input the target profit amount for this analysis."
      );
    } else {
      const body = { 
        accountId: accountDetails.accountId,
        strategySuccessRate: winRate > 10 ? 10 : winRate,
        profitExitProbability: profitProbability > 10 ? 10 : profitProbability,
        lossExitProbability: lossExitProbability > 10 ? 10 : lossExitProbability,
        numOfTrades: 0,
        accountBalance: accountDetails.accountBalance,
        averageNumOfTradesPerDay: averageDailyTrade,
        strategyProfitTarget: convertToPlainNumber(targetProfit)
      };

      const response = await analyzeTradingPlan(body).then((res) => {
        return res.data;
      });
      if (response.status) {
        navigation.navigate("PlanReport", { planReport: response.data });
      } else {
        Alert.alert("Failed Transaction", response.message);
      }
    }

    setIsLoading(false);
  };

  function convertToPlainNumber(input) {
    // Remove the dollar sign and any non-numeric characters except the decimal point
    let cleanedInput = input.replace(/[^0-9.]/g, '');
    
    // Remove any extra commas that might exist due to incorrect formatting
    cleanedInput = cleanedInput.replace(/,/g, '');
    
    // Convert the cleaned string to a number
    let plainNumber = parseFloat(cleanedInput);
    
    // If the number is not valid, return 0
    if (isNaN(plainNumber)) {
      return 0;
    }
    
    return plainNumber;
  }

  const formatNumber = (num) => {
    if (!num) return '';
    const [integer, decimal] = num.split('.');
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
  };

  const handleChangeText = (text) => {
    const cleanText = text.replace(/[^0-9.]/g, '');
    setTargetProfit(formatNumber(cleanText));
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginTop: SIZES.small,
          marginBottom: SIZES.medium,
        }}
      >
        <Text style={styles.signIn}>Analyze your Trading Plan</Text>
      </View>

      <Text
        style={{
          color: COLORS.darkyellow,
          textAlign: "center",
          fontSize: SIZES.xSmall,
          paddingHorizontal: SIZES.medium,
          marginVertical: SIZES.medium,
          marginTop: SIZES.small,
        }}
      >
        Attention!!: Please note that if you leave the input fields empty, we
        would calculate the answers based on your trading records with us.
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: SIZES.small,
          marginTop: SIZES.xSmall,
        }}
      >
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderColor: COLORS.white,
            borderWidth: 0.5,
            marginBottom: 30,
          }}
        >
          <Text style={{ color: COLORS.lightWhite, textAlign: "center" }}>
            1
          </Text>
        </View>
        <View style={{ width: "90%", marginTop: SIZES.medium }}>
          <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
            What is average number of trades you take per day?
          </Text>
          <TextInput
            placeholder="e.g  3"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
            style={styles.email(isNFocused)}
            onFocus={() => {
              setIsNFocused(true);
            }}
            onBlur={() => {
              setIsNFocused(false);
            }}
            onChangeText={(text) => {
              setAverageDailyTrade(text);
            }}
            value={averageDailyTrade}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: SIZES.small,
          marginTop: SIZES.xSmall,
        }}
      >
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderColor: COLORS.white,
            borderWidth: 0.5,
            marginBottom: 35,
          }}
        >
          <Text style={{ color: COLORS.lightWhite, textAlign: "center" }}>
            2
          </Text>
        </View>
        <View style={{ width: "90%", marginTop: SIZES.medium }}>
          <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
            Out of every 10 trades, how many would you say ends in profit?
          </Text>
          <TextInput
            placeholder="e.g  6"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
            style={styles.email(isUNFocused)}
            onFocus={() => {
              setIsUNFocused(true);
            }}
            onBlur={() => {
              setIsUNFocused(false);
            }}
            onChangeText={(val) => {
              setWinRate(val);
            }}
            value={winRate}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: SIZES.small,
          marginTop: SIZES.xSmall,
        }}
      >
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderColor: COLORS.white,
            borderWidth: 0.5,
            marginBottom: 35,
          }}
        >
          <Text style={{ color: COLORS.lightWhite, textAlign: "center" }}>
            3
          </Text>
        </View>
        <View style={{ width: "90%", marginTop: SIZES.medium }}>
          <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
            If 10 of your trades ended in profit, how many of them would
            you say were affected by your profit exit strategy?
          </Text>
          <TextInput
            placeholder="e.g  2"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
            style={styles.email(isEFocused)}
            onFocus={() => {
              setIsEFocused(true);
            }}
            onBlur={() => {
              setIsEFocused(false);
            }}
            onChangeText={(text) => {
              setProfitProbability(text);
            }}
            value={profitProbability}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: SIZES.small,
          marginTop: SIZES.xSmall,
        }}
      >
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            borderColor: COLORS.white,
            borderWidth: 0.5,
            marginBottom: 35,
          }}
        >
          <Text style={{ color: COLORS.lightWhite, textAlign: "center" }}>
            4
          </Text>
        </View>
        <View style={{ width: "90%", marginTop: SIZES.medium }}>
          <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
            If 10 of your trades ended in loss, how many of them would you
            say were affected by your loss exit strategy?
          </Text>
          <TextInput
            placeholder="e.g 3"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
            style={styles.email(isPNFocused)}
            onFocus={() => {
              setIsPNFocused(true);
            }}
            onBlur={() => {
              setIsPNFocused(false);
            }}
            onChangeText={(val) => {
              setLossExitProbability(val);
            }}
            value={lossExitProbability}
          />
        </View>
      </View>

      <View>
        <View style={{ width: "95%", marginTop: SIZES.medium }}>
          <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
            What's your target profit amount for this analysis?
          </Text>

          <NumericFormat
            value={targetProfit}
            displayType="text"
            thousandSeparator={true}
            prefix="$"
            renderText={(value, props) => (
              <TextInput
                placeholder="$1000"
                placeholderTextColor={COLORS.gray}
                keyboardType="numeric"
                style={styles.email(isTPFocused)}
                onFocus={() => {
                  setIsTPFocused(true);
                }}
                onBlur={() => {
                  setIsTPFocused(false);
                }}
                onChangeText={(val) => {setTargetProfit(val)}}
                value={value}
              />
            )}
          />
          {/* <TextInput
            placeholder="$1000"
            placeholderTextColor={COLORS.gray}
            keyboardType="numeric"
            style={styles.email(isTPFocused)}
            onFocus={() => {
              setIsTPFocused(true);
            }}
            onBlur={() => {
              setIsTPFocused(false);
            }}
            onChangeText={(val) => {
              setTargetProfit(val);
            }}
            value={targetProfit}
          /> */}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          setIsLoading(true)
          analyzeStrategy();
        }}
        style={[styles.button, { marginBottom: 60 }]}
      >
        {isLoading ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Analyze Strategy</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default StrategyAnalyzer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  signIn: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    alignSelf: "center",
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    marginTop: SIZES.small,
  },
  email: (focused) => ({
    borderColor: focused ? COLORS.darkyellow : COLORS.gray,
    borderWidth: 0.5,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    height: 50,
    width: "50%",
    color: COLORS.white,
    marginLeft: SIZES.xSmall,
  }),
  password: () => ({
    color: COLORS.white,
    width: "90%",
  }),
  button: {
    // margin: 80,
    height: 40,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 300,
    marginTop: 50,
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
