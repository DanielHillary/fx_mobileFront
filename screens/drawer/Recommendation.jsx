import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants/index";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Recommendation = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>
          Below is the PsydTrader recommendation for setting up a profitable
          trading plan. This recommendation also states the <Text
            style={[
              styles.text,
              { fontSize: SIZES.medium + 2, color: COLORS.darkyellow },
            ]}
          >
            mandated
          </Text>{" "}
          rules of engagement for the refund policy.
        </Text>
      </View>
      <View
        style={{
          borderColor: COLORS.darkyellow,
          borderWidth: 0.5,
          borderRadius: 40,
          marginVertical: SIZES.medium,
          padding: 10,
        }}
      >
        <Text style={styles.text}> Entry Strategy</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Always make sure to abide by the following guidelines for entry
          strategy management.
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
          <Text style={styles.subtext}>
            Entry Strategies are optional and the absence of a registered entry
            plan would only affect your PsyDScore but not your refund
            eligibility.
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
          <Text style={styles.subtext}>
            Endeavour to register your entry strategy on the platform so that we
            can help you track your progress.
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
          <Text style={styles.subtext}>
            Ensure that you confirm the indicators you used to place any trade
            before the trade is removed.
          </Text>
        </View>
      </View>

      <View
        style={{
          borderColor: COLORS.darkyellow,
          borderWidth: 0.5,
          borderRadius: 40,
          marginVertical: SIZES.medium,
          padding: 10,
        }}
      >
        <Text style={styles.text}> Exit Strategies</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Always make sure to abide by the following guidelines for exit
          strategy implementation.
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
          <Text style={styles.subtext}>
            Exit strategies are optional and their absence would not affect your
            PsyD Score or refund eligibility.
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
          <Text style={styles.subtext}>
            Develop exit strategies tailored to your account size and trading
            style. Market direction is never certain, so employ strategies to
            protect your investments and maintain consistent profitability
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
          <Text style={[styles.subtext, { color: COLORS.darkyellow }]}>
            Do not interfere with any trade outside of your preset exit level.
            This would lead to automatic disqualification from being refunded.
            If you do not have exit strategies in place, refrain from
            interfering with the trade altogether.
          </Text>
        </View>
      </View>
      <View
        style={{
          borderColor: COLORS.darkyellow,
          borderWidth: 0.5,
          borderRadius: 40,
          marginVertical: SIZES.medium,
          padding: 10,
        }}
      >
        <Text style={styles.text}>Risk Management</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Always make sure to abide by the following risk management guidelines
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
          <Text style={[styles.subtext, { color: COLORS.darkyellow }]}>
            A risk register is a compulsory requirement for refund eligibility
            and directly impacts your PsyD Score per trade.
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
          <Text style={[styles.subtext, { color: COLORS.darkyellow }]}>
            You are not allowed to risk more than 1% of your trading account
            balance on any trade.
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
          <Text style={[styles.subtext, { color: COLORS.darkyellow }]}>
            You are not allowed to enter a trade with a Risk to Reward Ratio 
            of less than 2.
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
          <Text style={[styles.subtext, { color: COLORS.darkyellow }]}>
            You are not allowed to lose more than 5% of your daily starting
            account balance in a day.
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
          <Text style={[styles.subtext, { color: COLORS.darkyellow }]}>
            You are not allowed to buy/sell more than 3 positions of an asset or
            pair at any time.
          </Text>
        </View>
        <Text style={styles.text}>
          Defaulting in any of the above{" "}
          <Text
            style={[
              styles.text,
              { fontSize: SIZES.medium + 2, color: COLORS.darkyellow },
            ]}
          >
            mandated
          </Text>{" "}
          guidelines will result in automatic disqualification from the refund
          benefits
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Plan");
          // setIsClicked(true);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>View Strategy</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Recommendation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appBackground,
    flex: 1,
    padding: SIZES.medium,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
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
  subtext: {
    color: COLORS.white,
    fontSize: SIZES.small + 1,
    fontFamily: FONT.regular,
    margin: SIZES.small,
  },
});
