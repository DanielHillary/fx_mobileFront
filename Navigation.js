import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES } from "./constants";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./components/dashboard/Dashboard";
import TradeAnalysis from "./screens/tabs/TradeAnalysis";
import PriceAlert from "./screens/tabs/PriceAlert";
import Profile from "./screens/tabs/Profile";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TradeDetails from "./screens/stack/TradeDetails";
import BottomSlide from "./components/BottomSlide";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Tab"
        component={BottomTab}
        options={{
          header: () => <StatusBar style="light" />,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TradeDetails"
        component={TradeDetails}
        //   options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Analysis") {
            iconName = focused ? "md-analytics" : "md-analytics-outline";
          } else if (route.name === "PriceAlert") {
            iconName = focused ? "md-alert-circle" : "md-alert-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-settings" : "ios-settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: COLORS.darkyellow,
        tabBarStyle: { backgroundColor: "#111", height: 65, borderRadius: 20 },
        tabBarShowLabel: false,
        headerStyle: styles.header,
        headerTitleStyle: styles.headertitle,
        headerTitleAlign: "center",
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Analysis" component={TradeAnalysis} />
      <Tab.Screen name="PriceAlert" component={PriceAlert} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  dashboard: {
    backgroundColor: "#111",
  },
  header: {
    backgroundColor: "#111",
  },
  headertitle: {
    color: COLORS.white,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    // marginTop: 10
  },
});
