import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useContext } from "react";
import { COLORS, FONT, SIZES } from "../constants";
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from "../context/AuthContext";



const CustomDrawer = (props) => {

  const {logout} = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} style={styles.base}>
        <View>
          <View
            style={{
              flexDirection: "row",
              padding: 15,
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Image
              source={require("../assets/icons/profile.png")}
              style={styles.image}
            />
            <View style={{ padding: 10 }}>
              <Text style={styles.text}>Daniel Ibeto</Text>
              <Text
                style={{
                  fontSize: SIZES.small,
                  color: COLORS.lightWhite,
                  fontFamily: FONT.regular,
                }}
              >
                232455454
              </Text>
            </View>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
            padding: 10,
            backgroundColor: COLORS.appBackground,
            position: "absolute",
            bottom: 50,
            width: 180,
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center'
        }}
        onPress={() => {
          logout();
        }}
      >
        
          <Ionicons name="log-in-outline" size={24} color={COLORS.lightWhite} />
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: SIZES.medium,
              color: COLORS.lightWhite,
            }}
          >
            Log Out
          </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  base: {
    backgroundColor: COLORS.appBackground,
  },
  text: {
    color: COLORS.lightWhite,
    fontSize: SIZES.large,
    width: 200,
  },
  image: {
    height: 50,
    width: 50,
  },
});
