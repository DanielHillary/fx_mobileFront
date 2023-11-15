import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: 125,
    padding: SIZES.medium - 3,
    backgroundColor: COLORS.componentbackground,
    borderRadius: SIZES.xSmall,
    flexDirection: "column",
    justifyContent: "space-between",
    // ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    // width: 'auto',
    justifyContent: 'space-between',
    marginTop: SIZES.small
  },
  asset: (symbol) => ({
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: symbol == "Synthetic" ? SIZES.medium : SIZES.xLarge
    // fontSize: SIZES.medium

  }),
  assets:{
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge
  },
  date: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.small
  },
  desc: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.lightWhite,
  },
  value: {
    color: COLORS.darkyellow,
    fontFamily: FONT.medium,
    fontSize: SIZES.medium
  },
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedJob) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
