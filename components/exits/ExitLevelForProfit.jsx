import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Switch,
  StyleSheet,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import ExitLevelCard from "./ExitLevelCard";
import EmptyList from "../EmptyList";
import { useNavigation } from "@react-navigation/native";
import ExitLevelCardForProfit from "./ExitLevelCardForProfit";
import { AuthContext } from "../../context/AuthContext";
import { updateAccountAutoMode } from "../../api/accountApi";

const ExitLevelForProfit = ({ details, isEmpty }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(isEmpty);
  const [isAuto, setIsAuto] = useState(true);

  const { accountDetails, userInfo } = useContext(AuthContext);

  const implementAutoMode = async(mode) => {
    const response = await updateAccountAutoMode(accountDetails.accountId, mode, true).then((res) => {
      return res.data;
    })
  }

  useEffect(() => {
    setIsAuto(accountDetails.autoExecuteProfitLevels);
  }, [])

  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <Text style={styles.text}> Profit Levels</Text>
      </View>

      {accountDetails.subscriptionType === "Exclusive" && <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginHorizontal: 8,
          gap: SIZES.medium,
          width: "90%",
        }}
      >
        <Text style={styles.mode}>Auto-implement Exit {isAuto ? "[On]" : "[Off]"}</Text>
        <Switch
          value={isAuto}
          onValueChange={() => {
            setIsAuto((prev) => !prev);
            implementAutoMode(!isAuto);
            console.log(!isAuto);
          }}
          trackColor={{ false: "black" }}
          thumbColor={"green"}
        />
      </View>}
      <ScrollView>
        <View style={styles.cardsContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" colors={COLORS.primary} />
          ) : isEmpty ? (
            <EmptyList message={"No profit exits"} />
          ) : (
            details?.map((item) => (
              <ExitLevelCardForProfit
                item={item}
                key={item.exitId}
                handleNavigate={() => {}}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ExitLevelForProfit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  header: {
    flexDirection: "row-reverse",
    // justifyContent: "space-between",
    alignItems: "end",
    marginTop: SIZES.small,
  },
  mode: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: COLORS.white,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.darkyellow,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
    alignSelf: "stretch",
  },
  cardsContainer: {
    flex: 1,
    borderRadius: 15,
    alignContent: "center",
    // gap: SIZES.small - 5,
  },
  text: {
    color: COLORS.white,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
  },
  options: {
    padding: SIZES.xSmall,
    borderWidth: 0.3,
    borderColor: COLORS.darkyellow,
    borderRadius: SIZES.medium,
    margin: SIZES.medium,
  },
});
