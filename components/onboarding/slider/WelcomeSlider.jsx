import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Swiper from "react-native-swiper";
import { loadCustomFont } from "../../../components/exits/exitlevelcard.style";
import { loadThemeCustomFont } from "../../../constants/theme";
import { COLORS, FONT, SIZES } from "../../../constants";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const WelcomeSlider = () => {

  const navigation = useNavigation();

  useEffect(() => {
    loadCustomFont();
    loadThemeCustomFont();
  }, [])

  return (
    <Swiper style={styles.wrapper} activeDotColor={COLORS.darkyellow} >
      <View style={styles.slider1}>
        <Image source={require("../../../assets/images/1.png")} 
          style={{height: 350, width: 500, alignSelf:"center", marginRight: SIZES.large * 3, marginTop: SIZES.large * 3}}
        />
        <Text style={styles.heading}>We mirror your trading plan across all your trades</Text>
        <Text style={styles.caption}>We help you implement your own trading plan from risk management to exit strategies</Text>
      </View>
      <View style={styles.slider2}>
        <Image source={require("../../../assets/images/2.png")} 
          style={{height: 350, width: 500, alignSelf: "center", marginRight: SIZES.large * 3.5, marginTop: SIZES.large * 3}}
        />
        <Text style={styles.heading}>Price alert for over 50 assets</Text>
        <Text style={styles.caption}>Set Alerts on all your favourite pairs/assets for both Synthetics and Currencies markets</Text>
      </View>
      <View style={styles.slider3}>
        <Image source={require("../../../assets/images/3.png")} 
          style={{height: 350, width: 500, alignSelf: "center", marginRight: SIZES.large * 3.5, marginTop: SIZES.large * 3}}
        />
        <Text style={styles.heading}>Automatic Trade Journaling and many more...</Text>
        <Text style={styles.caption}>Explore a wide range of tools to give you insight into your trading culture and make sure you stay profitable</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
          style={styles.button}
        >
          <Image 
            source={require("../../../assets/icons/forward.png")}
            style={{height: 30, width: 30, alignSelf: "center", justifyContent: "center", marginTop: 2.5}}
          />
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

export default WelcomeSlider;

const styles = StyleSheet.create({
  wrapper: {},
  slider1: {
    flex: 1,
    width: windowWidth,
    alignContent: 'center',
    padding: SIZES.large,
    backgroundColor: COLORS.appBackground,
  },
  button: {
    // margin: 80,
    height: 35,
    backgroundColor: COLORS.darkyellow,
    borderRadius: 10,
    width: 80,
    // padding: SIZES.medium,
    alignSelf: "flex-end",
    marginBottom: 20
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    fontSize: SIZES.small,
    color: "black",
    fontFamily: FONT.bold,
  },
  slider2: {
    flex: 1,
    width: windowWidth,
    padding: SIZES.large,
    alignContent: 'center',
    backgroundColor: COLORS.appBackground,
  },
  slider3: {
    flex: 1,
    width: windowWidth,
    padding: SIZES.large,
    alignContent: 'center',
    backgroundColor: COLORS.appBackground,
  },
  caption: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    marginTop: SIZES.small
  },
  heading: {
    color: COLORS.white,
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.medium
  }
});
