import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import { Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { getTodayReport, getWeeklyReport } from "../../api/accountApi";

const AccountReport = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isProfit, setIsProfit] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [report, setReport] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [reportRange, setReportRange] = useState("Last 7 days");
  const [positions, setPositions] = useState([]);
  const [assets, setAssets] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [enoughTrades, setEnoughTrades] = useState(false);
  const [buys, setBuys] = useState(0.56);
  const [sells, setSells] = useState(0.45);
  const [paid, setPaid] = useState(true);

  const { accountDetails } = useContext(AuthContext);
  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const data = {
    labels: ["Buy", "Sell"], // optional
    data: [buys, sells],
  };

  const bardata = {
    labels: assets,
    datasets: [
      {
        data: frequency,
      },
    ],
  };

  const getReportsForToday = async () => {
    setIsLoading(true);
    try {
      const response = await getTodayReport(accountDetails.accountId).then(
        (res) => {
          return res.data;
        }
      );
      if (response.status) {
        setReport(response.data);
        setIsProfit(response.data.accountChangeIsPositive);
        setAssets(response.data.tradedAssets);
        setFrequency(response.data.tradeFrequency);
        setSells(response.data.sellPercent);
        setBuys(response.data.buyPercent);

        setIsLoading(false);
      } else {
        setEnoughTrades(true);
        setIsLoading(false);
      }
    } catch (error) {
      setEnoughTrades(true);
      setIsLoading(false);
    }
  };

  const getWeekOrMonthReport = async (range) => {
    if (accountDetails.paidAccount) {
      setIsLoading(true);
      try {
        const response = await getWeeklyReport(
          accountDetails.accountId,
          range
        ).then((res) => {
          return res.data;
        });
        if (response.status) {
          setReport(response.data);
          setIsProfit(response.data.accountChangeIsPositive);
          setAssets(response.data.tradedAssets);
          setFrequency(response.data.tradeFrequency);
          setSells(response.data.sellPercent);
          setBuys(response.data.buyPercent);
          setIsLoading(false);
        } else {
          setEnoughTrades(true);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      setPaid(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getWeekOrMonthReport(7);
    setIsLoading(false);
  }, []);


  if(!paid){
    return (
      <View style={styles.baseContainer}>
        <Text style={styles.introText}>AccountReport</Text>
        <View style={{ padding: SIZES.medium, marginTop: SIZES.xLarge }}>
          <Text style={styles.note}>
            {" "}
            Unfortunately, you cannot view you account analysis until you have renewed your subscription. 
            Kindly upgrade your account to continue using this feature.
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Pricing");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Upgrade Account.</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  if (isLoading) {
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
    );
  } else if (enoughTrades) {
    return (
      <View style={styles.baseContainer}>
        <Text style={styles.introText}>AccountReport</Text>
        <View style={{ padding: SIZES.medium, marginTop: SIZES.xLarge }}>
          <Text style={styles.note}>
            {" "}
            A minimum of 10 trades is required for use to present an analysis
            report on your account. You can check back when you have completed
            10 trades and above.
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Got it.</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.baseContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <View
          style={{
            borderColor: COLORS.darkyellow,
            borderWidth: 0.5,
            borderRadius: SIZES.small,
            width: 120,
            marginLeft: SIZES.large * 1.5,
          }}
        >
          <Text style={styles.note}>{reportRange}</Text>
        </View>
        <TouchableOpacity
          style={{ alignSelf: "flex-end", paddingRight: SIZES.large * 1.5 }}
          onPress={() => {
            setIsModalVisible(true);
          }}
        >
          <Image
            source={require("../../assets/icons/dottedoptions.png")}
            style={{ height: 20, width: 20 }}
          />
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                getReportsForToday();
                setReportRange("Today");
              }}
            >
              <Text style={styles.optionText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                getWeekOrMonthReport(7);
                setReportRange("Last 7 days");
              }}
            >
              <Text style={styles.optionText}>Last 7 days</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                getWeekOrMonthReport(30);
                setReportRange("Last 30 days");
              }}
            >
              <Text style={styles.optionText}>Last 30 days</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                // getWeekOrMonthReport(30);
              }}
            >
              <Text style={styles.optionText}>Custom date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.introText}>AccountReport</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: SIZES.small,
          marginHorizontal: SIZES.medium,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.text, { fontSize: SIZES.small }]}>
            Total profit:
          </Text>
          <View style={styles.balcontain}>
            <Text style={[styles.info, { color: "green" }]}>
              ${report.amountProfit}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.text, { fontSize: SIZES.small }]}>
            Total loss:
          </Text>
          <View style={styles.balcontain}>
            <Text style={[styles.info, { color: "red" }]}>
              ${report.amountLoss}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <ProgressChart
          data={data}
          width={320}
          height={180}
          strokeWidth={16}
          radius={32}
          chartConfig={styles.chartConfig}
          hideLegend={false}
          style={styles.progressChart}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: SIZES.xSmall,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.balcontain}>
          <Text style={styles.text}>Starting balance</Text>
          <Text style={styles.balanceText}> ${report.startingBalance}</Text>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Image
            source={
              isProfit
                ? require("../../assets/icons/arrowup.png")
                : require("../../assets/icons/arrowdown.png")
            }
            style={{ height: 20, width: 20 }}
          />
          <Text style={styles.percent(isProfit)}>
            {report.percentageChangeInAccount}%
          </Text>
        </View>
        <View style={styles.balcontain}>
          <Text style={styles.text}>Closing balance</Text>
          <Text style={styles.balanceText}> ${report.closingBalance}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SIZES.small,
        }}
      >
        <Image
          source={require("../../assets/icons/bulleting.png")}
          style={{ height: 15, width: 15 }}
        />
        <Text style={styles.note}>
          A total of <Text style={styles.info}>{report.totalNumOfTrades}</Text>{" "}
          trades so far with{" "}
          <Text style={styles.info}>{report.tradeLossRatio}%</Text> (
          {report.totalNumOfLossTrades} trades) in loss, and{" "}
          <Text style={styles.info}>{report.tradeProfitRatio}%</Text> (
          {report.totalNumOfProfitTrades} trades) in profit
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SIZES.small,
        }}
      >
        <Image
          source={require("../../assets/icons/bulleting.png")}
          style={{ height: 15, width: 15 }}
        />
        {report.successFactor < 1 ? (
          <Text style={styles.note}>
            On average, you are loosing{" "}
            <Text style={styles.info}>${report.avgLosingTrades}</Text> per
            trade. That's <Text style={styles.info}>${report.winLossDiff}</Text>{" "}
            ({report.winLossDiffRatio}%) more than you gain on average for a win
            trade
            <Text style={styles.info}>(${report.avgWinningTrades})</Text>. You
            need to stick to your trading plan to regain profitability.
          </Text>
        ) : (
          <Text style={styles.note}>
            On average, you are gaining{" "}
            <Text style={styles.info}>${report.avgWinningTrades}</Text> per
            trade. That's <Text style={styles.info}>${report.winLossDiff}</Text>{" "}
            ({report.winLossDiffRatio}%) more than you lose on average for a bad
            trade.
            <Text style={styles.info}>(${report.avgLosingTrades})</Text>. Hence,
            it's been profitable.
          </Text>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SIZES.small,
        }}
      >
        <Image
          source={require("../../assets/icons/bulleting.png")}
          style={{ height: 15, width: 15 }}
        />
        <Text style={styles.note}>
          Your trading account {isProfit ? "increased" : "decreased"} by
          <Text style={styles.info}> ${report.changeInAccount}</Text>.
        </Text>
      </View>

      <Text
        style={[
          styles.info,
          { fontSize: SIZES.small, margin: SIZES.medium, fontStyle: "italic" },
        ]}
      >
        Please note: We do not take into account your withdrawals or deposits
        and as such, your closing balance might be different from your current
        balance.
      </Text>
      <View
        style={{
          backgroundColor: COLORS.secondary,
          height: 0.5,
          width: "100%",
          marginVertical: 10,
        }}
      />
      <Text style={[styles.text, { marginLeft: SIZES.small }]}>
        {" "}
        Frequency chart
      </Text>

      <BarChart
        style={styles.graphStyle}
        data={bardata}
        width={screenWidth - 50}
        height={350}
        yAxisLabel=""
        chartConfig={styles.chartConfig}
        verticalLabelRotation={90}
        showValuesOnTopOfBars
        fromZero
      />

      <Text
        style={[
          styles.info,
          {
            fontSize: SIZES.small,
            marginLeft: SIZES.medium,
            marginBottom: SIZES.small,
            fontStyle: "italic",
          },
        ]}
      >
        Your most traded asset is {report.mostTradedAsset}.
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SIZES.small,
        }}
      >
        <Image
          source={require("../../assets/icons/bulleting.png")}
          style={{ height: 15, width: 15 }}
        />
        <Text style={styles.note}>
          So far, You have a total of{" "}
          <Text style={styles.info}>{report.totalNumOfProfitTrades}</Text>{" "}
          profitable trades and {report.mostProfitableAsset} contributed the
          highest{" "}
          <Text style={styles.info}>
            ({report.percentageProfitByMostProfitableAsset}%)
          </Text>{" "}
          to your profits with a total of{" "}
          <Text style={styles.info}>${report.profitByMostProfitableAsset}</Text>
          .
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SIZES.small,
        }}
      >
        <Image
          source={require("../../assets/icons/bulleting.png")}
          style={{ height: 15, width: 15 }}
        />
        <Text style={styles.note}>
          Your most unprofitable asset is {report.mostUnprofitableAsset}. It has
          cost you
          <Text style={styles.info}>
            {" "}
            ${report.lossByMostUnprofitableAsset}
          </Text>{" "}
          and{" "}
          <Text style={styles.info}>
            {report.percentageLossByMostUnprofitableAsset}%
          </Text>{" "}
          of your total losses.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: COLORS.secondary,
          height: 0.5,
          width: "100%",
          marginVertical: 10,
        }}
      />
      <Text style={styles.introText}> Power Points</Text>

      <View>
        <View
          style={{
            flexDirection: "row",
            padding: SIZES.xSmall,
            gap: SIZES.xSmall + 2,
          }}
        >
          <View style={[styles.powerPoints]}>
            <Text style={styles.pointText}>Average PsyDTrader trade score</Text>
            <Text style={styles.balanceText}>{report.averagePsychScore}%</Text>
          </View>
          <View style={[styles.powerPoints]}>
            <Text style={styles.pointText}>Trading plan completion status</Text>
            <Text style={styles.balanceText}>
              {accountDetails.completionStatus}%
            </Text>
          </View>
          <View style={[styles.powerPoints]}>
            <Text style={styles.pointText}>Strategy Compliance Ratio</Text>
            <Text style={styles.balanceText}>{report.complianceRatio}%</Text>
          </View>
        </View>
        <View
          style={[
            styles.powerPoints,
            { padding: SIZES.xSmall, marginLeft: SIZES.small },
          ]}
        >
          <Text style={[styles.pointText, { marginBottom: 10 }]}>
            Strategy Success Rate
          </Text>
          <Text style={styles.balanceText}>{report.tradeProfitRatio}%</Text>
        </View>

        {report.adjustStrategy ? (
          <Text
            style={[
              styles.note,
              {
                color: COLORS.darkyellow,
                fontSize: SIZES.small,
                fontStyle: "italic",
                marginLeft: SIZES.large,
              },
            ]}
          >
            Your strategy is below average. Consider a review to improve trading
            outcome.
          </Text>
        ) : (
          <View>
            <Text
              style={[
                styles.note,
                {
                  color: COLORS.darkyellow,
                  fontSize: SIZES.small,
                  fontStyle: "italic",
                  marginLeft: SIZES.large,
                },
              ]}
            >
              Your strategy looks good. We always encourage review from time to
              time as the market evolves.
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.small,
          }}
        >
          <Image
            source={require("../../assets/icons/bulleting.png")}
            style={{ height: 15, width: 15 }}
          />
          <Text style={styles.note}>{report.reportMessage}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.small,
          }}
        >
          <Image
            source={require("../../assets/icons/bulleting.png")}
            style={{ height: 15, width: 15 }}
          />
          {report.tradeProfitRatio < 50 ? (
            <Text style={styles.note}>
              With your current success rate, you should be consistently profitable. 
              Always stick to a minimum RRR of 1:2 to stay profitable.
            </Text>
          ) : (
            <Text style={styles.note}>
              We encourage you to always aim for a minimum Risk/Reward ratio of
              1:2 per trade to stay profitable.
            </Text>
          )}
        </View>

        {isComplete && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: SIZES.small,
            }}
          >
            <Image
              source={require("../../assets/icons/bulleting.png")}
              style={{ height: 15, width: 15 }}
            />
            <Text style={styles.note}>
              You have an incomplete trading plan. To score higher, please
              complete your strategy.
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Plan");
            // setIsClicked(true);
          }}
          style={styles.button}
        >
          {isClicked ? (
            <ActivityIndicator size="large" colors={"black"} />
          ) : (
            <Text style={styles.buttonText}>
              {!isComplete ? "View Strategy" : "Complete your plan"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountReport;

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
  },
  percent: (profit) => ({
    color: profit ? "green" : "red",
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
  }),
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  info: {
    color: COLORS.darkyellow,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium + 1,
    // margin: SIZES.small,
  },
  modal: {
    backgroundColor: COLORS.componentbackground,
    borderRadius: SIZES.small,
    width: 150,
    marginTop: 90,
    marginLeft: 140,
  },
  introText: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    color: COLORS.lightWhite,
    alignSelf: "center",
    marginVertical: 15,
  },
  note: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    margin: SIZES.small,
    width: "85%",
  },
  optionText: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    margin: SIZES.small,
  },
  pointText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
  },
  balanceText: {
    fontSize: SIZES.xLarge - 3,
    fontFamily: FONT.bold,
    color: COLORS.darkyellow,
    textAlign: "left",
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
  },
  balcontain: {
    padding: SIZES.small,
    margin: SIZES.small,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    borderRadius: SIZES.small - 5,
  },
  powerPoints: {
    alignItems: "center",
    padding: SIZES.small,
    width: 100,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    borderRadius: SIZES.small - 5,
  },
  chartConfig: {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(25, 255, 146, ${opacity})`,
    // color: () => "red",
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  },
  progressChart: {
    alignSelf: "flex-start",
    height: 170,
  },

  graphStyle: {
    alignSelf: "center",
    fontSize: SIZES.xSmall - 4,
    marginTop: SIZES.small,
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
