import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, FONT } from "../../../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Bronze from "./Bronze";
import Gold from "./Gold";
import PriceModal from "../../../components/modal/PriceModal";

const TopTab = createMaterialTopTabNavigator();

const TopTabGroup = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.darkyellow,
          borderRadius: 10,
        },
        tabBarActiveTintColor: COLORS.darkyellow,
        tabBarInactiveTintColor: COLORS.gray,
      }}
    >
      <TopTab.Screen name="Bronze" component={Bronze} options={{}} />
      <TopTab.Screen name="Gold" component={Gold} />
    </TopTab.Navigator>
  );
};

const Pricing = () => {
  const [isRegular, setIsRegular] = useState(true);
  const [regular, setRegular] = useState(true);
  const [strict, setStrict] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setModalVisible = (value) => {
    setIsModalVisible(value)
  }

  return (
    <View style={styles.base}>
      {/* <View style={{ marginBottom: SIZES.medium }}>
        <Text style={styles.baseText}>Pricing</Text>
      </View> */}
      <TopTabGroup />
      
      <Modal
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="slide"
        transparent={true}
      >
        <PriceModal setVisibility={setModalVisible}/>
      </Modal>
    </View>
  );
};

export default Pricing;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  tabBar:{
    backgroundColor: COLORS.appBackground,
  },
  baseText: {
    color: COLORS.lightWhite,
    padding: 5,
    marginHorizontal: 15,
    fontSize: SIZES.large + 5,
    fontWeight: "500",
  },
  
  text: {
    color: "black",
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
});
