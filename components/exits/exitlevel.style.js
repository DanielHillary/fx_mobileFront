import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.small,
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
    alignSelf: "stretch"
  },
  cardsContainer: {
    flex: 1,
    gap: SIZES.small - 5,
  },
});

export default styles;
