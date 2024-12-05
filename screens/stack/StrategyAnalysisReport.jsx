import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONT, SIZES } from "../../constants";
import { Table, Row, Rows } from "react-native-table-component";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useRoute } from "@react-navigation/native";

const Emphasis = ({ text }) => {
  return (
    <Text style={styles.empha}>
      {text}
    </Text>
  )
}

const StrategyAnalysisReport = () => {
  const [balance, setBalance] = useState([]);
  const [isProfit, setIsProfit] = useState(false);

  const route = useRoute();

  const details = route.params?.planReport || null;

  const screenWidth = Dimensions.get("window").width;

  const tableHead = ["SL(%)", "TP(%)", "RRR"];

  const tableData = [details.slPercent, details.tpPercent, details.riskReward];

  let profitTradesByExitLevel = (100 * details.profitExitProbability) / 100;
  let lossTradesByExitLevel = (100 * details.lossExitProbability) / 100;

  useEffect(() => {
    setBalance(details.balanceIncrease);
  }, []);

  const chartData = {
    labels: details.monthSet,
    datasets: [
      {
        data: details.balanceIncrease,
      },
    ],
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  

  // console.log(details);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.htext}>Analysis Result</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: SIZES.small,
          marginHorizontal: SIZES.medium,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.info, { fontSize: SIZES.small, width: "30%" }]}>
            Start balance:
          </Text>
          <View style={styles.balcontain}>
            <Text style={[styles.info, { color: "green" }]}>
              {formatter.format(details.accountBalance)}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.info, { fontSize: SIZES.small, width: "30%" }]}>
            Close balance:
          </Text>
          <View style={styles.balcontain}>
            <Text style={[styles.info, { color: "green" }]}>
              {formatter.format(details.targetBalance)}
            </Text>
          </View>
        </View>
      </View>

      <Text
        style={[
          styles.info,
          { fontSize: SIZES.small, margin: SIZES.medium, fontStyle: "italic" },
        ]}
      >
        Please note: We do not take into account your withdrawals or deposits
        and as such, your "close balance" is the target account balance for this
        analysis
      </Text>
      <View
        style={{
          flexDirection: "row",
          padding: SIZES.xSmall,
          gap: SIZES.xSmall + 2,
        }}
      >
        <View style={[styles.powerPoints]}>
          <Text style={styles.pointText}>Strategy win rate</Text>
          <Text style={[styles.balanceText, { color: "green" }]}>
            {details.strategySuccessRate}%
          </Text>
        </View>
        <View style={[styles.powerPoints]}>
          <Text style={styles.pointText}>Strategy loss rate</Text>
          <Text style={[styles.balanceText, { color: "red" }]}>
            {details.strategyFailureRate}%
          </Text>
        </View>
        <View style={[styles.powerPoints]}>
          <Text style={[styles.pointText, {fontSize: SIZES.medium - 2}]}>Total Number of trades</Text>
          <Text style={styles.balanceText}>{details.numOfTrades}</Text>
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
          Your strategy win rate is the ratio of your profitable trades to your
          total trades.
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
          Your strategy loss rate is the ratio of your unprofitable trades to
          your total trades.
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          padding: SIZES.xSmall,
          gap: SIZES.xSmall + 2,
        }}
      >
        <View style={[styles.powerPoints]}>
          <Text style={styles.pointText}>Profit Exit Ratio/Profit</Text>
          <Text style={[styles.balanceText, { color: "green" }]}>
            {details.profitExitProbability}%
          </Text>
        </View>
        <View style={[styles.powerPoints]}>
          <Text style={styles.pointText}>Loss Exit Ratio/Loss</Text>
          <Text style={[styles.balanceText, { color: "red" }]}>
            {details.lossExitProbability}%
          </Text>
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
          Your Profit exit Ratio/Profit indicates the number of times your
          profitable trades were affected by your profit exit strategy(s).
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
          Your loss exit Ratio/loss indicates the number of times your
          unprofitable trades were affected by your loss exit strategy(s).
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

      <Text
        style={[styles.pointText, { marginLeft: 5, color: COLORS.darkyellow }]}
      >
        Account Progress Chart
      </Text>
      <View
        style={{
          backgroundColor: COLORS.secondary,
          height: 0.5,
          width: "48%",
        }}
      />

      <LineChart
        data={chartData}
        width={screenWidth - 30} // from react-native
        height={220}
        yAxisLabel={"$"}
        xAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#08130D",
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(25, 255, 146, ${opacity})`,
          decimalPlaces: 2, // optional, defaults to 2dp
          // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            width: "100%",
            borderRadius: 10,
          },
        }}
        // bezier
        style={{
          marginVertical: 20,
          alignSelf: "center",
          alignContent: "center",
          padding: 0,
        }}
        yAxisInterval={2}
      />

      <Text
        style={[
          styles.note,
          { margin: 0, fontStyle: "italic", marginLeft: 5, marginBottom: 15 },
        ]}
      >
        The critical path analysis above indicates an estimation of your account
        growth given your current trading plan
      </Text>

      <Text style={[styles.info, { marginLeft: 5, color: COLORS.darkyellow }]}>
        Trading factors
      </Text>
      <View
        style={{
          backgroundColor: COLORS.secondary,
          height: 0.5,
          width: "27%",
          marginLeft: 5,
        }}
      />

      <View
        style={{
          width: "80%",
          marginTop: SIZES.small,
          marginLeft: SIZES.small,
        }}
      >
        <Table borderStyle={{ borderWidth: 1, borderColor: COLORS.secondary }}>
          <Row
            data={tableHead}
            style={{ height: 25, backgroundColor: COLORS.appBackground }}
            textStyle={{
              textAlign: "center",
              fontWeight: "bold",
              color: COLORS.darkyellow,
            }}
          />
          <Row
            data={tableData}
            style={{ height: 25 }}
            textStyle={{
              textAlign: "center",
              color: "green",
              fontSize: SIZES.medium,
            }}
          />
        </Table>
      </View>

      <Text style={styles.note}>
        Given your current risk register, we assume that for every trade you
        take, you maintain a <Emphasis text={details.slPercent}/>% and <Emphasis text={details.tpPercent}/>% risk to reward of your
        trading capital respectively.
      </Text>

      <Text style={[styles.note, {fontSize: SIZES.medium, color:COLORS.gray2}]}>{details.strategyRemark}</Text>

      <Text
          style={[
            styles.info,
            {
              fontSize: SIZES.small,
              margin: SIZES.medium,
              fontStyle: "italic",
              color: COLORS.darkyellow,
            },
          ]}
        >
          Note!: For this analysis, Your account is compounded or decompounded on a weekly basis.
        </Text>

      <View
        style={{
          backgroundColor: COLORS.secondary,
          height: 0.5,
          width: "100%",
          marginBottom: 10,
        }}
      />

      <View style={{ marginBottom: 80 }}>
        <Text
          style={[
            styles.pointText,
            { marginLeft: 5, color: COLORS.darkyellow },
          ]}
        >
          Analysis Assumptions
        </Text>
        <View
          style={{
            backgroundColor: COLORS.secondary,
            height: 1.5,
            width: "42%",
            marginLeft: 5,
            marginBottom: 15,
          }}
        />

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
            If you had a total of 100 profitable trades and{" "}
            {details.profitExitProbability}% were affected, that means{" "}
            <Emphasis text={(100 * details.profitExitProbability) / 100} /> trades did not give
            you 100% of your target profit. Only{" "}
            <Emphasis text={100 - (100 * details.profitExitProbability) / 100} />of your
            profitable trades gave you 100% of your target profit.
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
            Of the <Emphasis text={profitTradesByExitLevel}/> of your affected trades, we split
            them evenly across your profit exit levels i.e if you have 2 profit
            exit levels, we apply a total of <Emphasis text={profitTradesByExitLevel / 2} /> to
            each exit level.
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
            We then add the sum of all profit trades that were affected by your
            profit exit level(i.e did not give you 100% profit target) to the
            sum of all profitable trades that were not affected (i.e gave you
            100% of your profit target)
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
            We repeat a similar process for the trades that end in loss to get
            the effective cummulative loss from applying your current trading
            plan to your trades.
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
            The cummulative loss for a cycle is subtracted from the cummulative
            profit for that same cycle. This difference is added/subtracted from
            your balance to obtain an cycle up-to-date balance amount for the
            next cycle.
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
            The above process is repeated until the target account balance is
            reached OR the account is in the negative.
          </Text>
        </View>

        <Text
          style={[
            styles.info,
            {
              fontSize: SIZES.small,
              margin: SIZES.medium,
              fontStyle: "italic",
              color: COLORS.darkyellow,
            },
          ]}
        >
          Please note: This is a summary of the framework we employ to analyze
          your trading plan. The actual computational analysis is far more complex than we
          can outline here. Therefore your results might differ slightly from ours.
        </Text>
      </View>
    </ScrollView>
  );
};

export default StrategyAnalysisReport;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.xSmall,
  },
  empha: {
    color: COLORS.darkyellow,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold
  },
  note: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    margin: SIZES.small,
    width: "90%",
  },
  info: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium - 2,
    // margin: SIZES.small,
  },
  htext: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    alignSelf: "center",
  },
  powerPoints: {
    alignItems: "center",
    padding: SIZES.small,
    width: 100,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    borderRadius: SIZES.small - 5,
  },
  pointText: {
    color: COLORS.white,
    fontFamily: FONT.regular,
    fontSize: SIZES.medium - 2,
  },
  balcontain: {
    padding: SIZES.small,
    // margin: SIZES.small,
    borderColor: COLORS.darkyellow,
    borderWidth: 0.2,
    borderRadius: SIZES.small - 5,
  },
  balanceText: {
    fontSize: SIZES.xLarge - 1,
    fontFamily: FONT.bold,
    color: COLORS.darkyellow,
    textAlign: "left",
    marginTop: SIZES.small,
  },
});
