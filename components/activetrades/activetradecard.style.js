import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: 140,
    padding: SIZES.medium - 5,
    backgroundColor: "#1a1918",
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
    flexDirection: "row",
    width: 'auto',
    justifyContent: 'space-between',
    marginTop: SIZES.medium
  },
  asset: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge
  },
  date: {
    color: COLORS.lightWhite,
    fontFamily: FONT.bold,
    fontSize: SIZES.small
  },
  jobName: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
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
