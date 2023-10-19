import { StyleSheet } from "react-native";
import * as Font from 'expo-font';

import { COLORS, SHADOWS, SIZES } from "../../constants";

export async function loadCustomFont() {
  await Font.loadAsync({
        DMBold: require ('../../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require ('../../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require ('../../assets/fonts/DMSans-Regular.ttf'),
  });

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "black",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  logImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.lightWhite,
  },
  jobType: {
    fontSize: SIZES.small,
    fontFamily: "DMRegular",
    color: COLORS.lightWhite,
    textTransform: "capitalize",
  },
});

export default styles;
