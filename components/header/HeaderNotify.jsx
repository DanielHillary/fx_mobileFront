import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { SIZES } from "../../constants";
import { AuthContext } from "../../context/AuthContext";

const HeaderNotify = ({ iconUrl, dimension, handlePress }) => {
  const { hasNotification, updateNotification } = useContext(AuthContext);
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      {hasNotification ? (
        <Image
          source={require("../../assets/icons/Notification.png")}
          resizeMode="cover"
          style={styles.btnImg(dimension)}
        />
      ) : (
        <Image
          source={iconUrl}
          resizeMode="cover"
          style={styles.btnImg(dimension)}
        />
      )}
    </TouchableOpacity>
  );
};

export default HeaderNotify;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    width: 40,
    height: 40,
    // backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
  redd: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "red",
    marginBottom: 20,
    zIndex: -1,
  },
});
