import { Dimensions, StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screenWidth/1.2,
    height: 90,
    padding: SIZES.large - 5 ,
    backgroundColor: COLORS.componentbackground,
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    alignItems: "center",
    // ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.componentbackground,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  assetName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.darkyellow,
    marginRight: SIZES.xLarge,
    // marginHorizontal: SIZES.xLarge
  },
  infoContainer: {
    // paddingHorizontal: SIZES.large
  },
  position: {
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: COLORS.lightWhite,
    alignItems: 'center',
    
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
  alertprice: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: COLORS.lightWhite,
  },
  broker: {
    color: COLORS.lightWhite,
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    marginTop: SIZES.xSmall
  }
});

export default styles;
