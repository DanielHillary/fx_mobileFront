import { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import ExitLevelCard from "./ExitLevelCard";
import EmptyList from "../EmptyList";
import { useNavigation } from "@react-navigation/native";
import ExitLevelCardForProfit from "./ExitLevelCardForProfit";

const ExitLevelForProfit = ({ details, isEmpty }) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(isEmpty);

  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <Text style={styles.text}> Profit Levels</Text>
      </View>
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
    fontSize: SIZES.medium
  },
  options: {
    padding: SIZES.xSmall,
    borderWidth: 0.3,
    borderColor: COLORS.darkyellow,
    borderRadius: SIZES.medium,
    margin: SIZES.medium,
  },
});
