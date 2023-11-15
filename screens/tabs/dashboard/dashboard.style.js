import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../../constants";
const styles = StyleSheet.create({
    logoImage: {
      height: 50,
      width: 50,
      borderRadius: 25,
      marginTop: 10
    },
    logoContainer: {
      width: 50,
      height: 50,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.medium,
      justifyContent: "center",
      alignItems: "center",
    },
  })

  export default styles;