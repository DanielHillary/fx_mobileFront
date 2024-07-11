import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { COLORS, SIZES, FONT} from '../../constants'
import { AuthContext } from '../../context/AuthContext';
import { analyzeTradingPlan } from '../../api/tradingplanApi';
import { useNavigation } from '@react-navigation/native';

const StrategyAnalyzer = () => {
    
  const [isEFocused, setIsEFocused] = useState(false);
  const [isNFocused, setIsNFocused] = useState(false);
  const [isPNFocused, setIsPNFocused] = useState(false);
  const [isUNFocused, setIsUNFocused] = useState(false);
  const [isTPFocused, setIsTPFocused] = useState(false);
  const [profitProbability, setProfitProbability] = useState("")
  const [lossExitProbability, setLossExitProbability] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [averageDailyTrade, setAverageDailyTrade] = useState(0);
  const [targetProfit, setTargetProfit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { accountDetails } = useContext(AuthContext);

  const navigation = useNavigation();

  const analyzeStrategy = async() => {

    const body = {
      accountId: accountDetails.accountId,
      strategySuccessRate: winRate,
      profitExitProbability: profitProbability,
      lossExitProbability: lossExitProbability,
      numOfTrades: 0,
      accountBalance: accountDetails.accountBalance,
      averageNumOfTradesPerDay: averageDailyTrade,
      strategyProfitTarget: targetProfit,
    }

    console.log(body);

    if(targetProfit === 0){
      Alert.alert(
        "Please fill",
        "Please input the target profit amount for this analysis."
      );
    }else{
      const response = await analyzeTradingPlan(body).then((res) => {
        return res.data;
      })
      if(response.status){
        console.log(response.data);
        navigation.navigate("PlanReport", { planReport : response.data});
      }else{
        Alert.alert(
          "Failed Transaction",
          response.message
        );
      }
    }
  }

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
          Attention!!: Please note that if you leave the input fields empty,
           we would calculate the answers based on your trading records with us.
        </Text>

      <View style={{ width: "95%", marginTop: SIZES.medium }}>
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

      <View style={{ width: "95%", marginTop: SIZES.medium }}>
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

      <View style={{ width: "95%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          If 10 of your trades hit take profit (TP), how many of them would you say were affected by your profit exit strategy?
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

      <View style={{ width: "95%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          If 10 of your trades hit stop loss (SL), how many of them would you say were affected by your loss exit strategy?
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

      <View style={{ width: "95%", marginTop: SIZES.medium }}>
        <Text style={{ color: COLORS.lightWhite, padding: SIZES.small - 5 }}>
          What's your target profit amount for this analysis?
        </Text>
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
          onChangeText={(val) => {
            setTargetProfit(val);
          }}
          value={targetProfit}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          analyzeStrategy();
        }}
        style={[styles.button, {marginBottom: 60}]}
      >
        {isLoading ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : (
          <Text style={styles.buttonText}>Analyze Strategy</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  )
}

export default StrategyAnalyzer

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
