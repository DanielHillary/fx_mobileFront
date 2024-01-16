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
    height: 70,
    columnGap: SIZES.medium,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: "#111",
    // ...SHADOWS.medium,
    shadowColor: COLORS.white,
    alignSelf: "flex-start"
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
    flexDirection: 'row',
    // marginHorizontal: SIZES.small,
    gap: SIZES.large
  },
  at: {
    fontSize: SIZES.small,
    fontFamily: "DMBold",
    color: COLORS.lightWhite,
  },
  jobType: {
    fontSize: SIZES.small,
    fontFamily: "DMRegular",
    color: COLORS.lightWhite,
    textTransform: "capitalize",
    // marginLeft: 20
  },
});

export default styles;
