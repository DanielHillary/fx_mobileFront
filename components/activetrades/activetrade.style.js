import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large * 2,
    // padding: SIZES.small,
    // marginBottom: SIZES.medium
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small
  },
  alertText: {
    color: "black",
    fontFamily: FONT.bold,
  },
  levelText: {
    color: COLORS.lightWhite,
    alignSelf: "flex-end",
    fontSize: SIZES.small + 2,
    marginBottom: 4,
    fontFamily: FONT.medium,
  },
  alertMessage: {
    color: COLORS.white,
    textAlign: "center",
  },
  alertContainer: {
    backgroundColor: "black",
    borderRadius: SIZES.medium,
    width: 200,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.darkyellow,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.lightWhite,
  },
  cardsContainer: {
    marginBottom: 10,
  },
});

export default styles;
