import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { useState, useEffect, useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES } from "./constants";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Dashboard from "./screens/tabs/dashboard/Dashboard";
import TradeAnalysis from "./screens/tabs/TradeAnalysis";
import PriceAlert from "./screens/tabs/PriceAlert/PriceAlert";
import Profile from "./screens/tabs/Profile";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import TradeDetails from "./screens/stack/TradeDetails";
import ScreenHeaderBtn from "./components/header/ScreenHeaderBtn";
import menu from "./assets/icons/menu.png";
import notification from "./assets/icons/notify.png";
import RiskAnalysis from "./screens/stack/RiskAnalysis";
import AutoTrader from "./screens/stack/AutoTrader";
import SetAlert from "./screens/tabs/PriceAlert/SetAlert";
import AlertDetails from "./screens/tabs/PriceAlert/AlertDetails";
import CustomDrawer from "./components/CustomDrawer";
import Account from "./screens/drawer/Account";
import Pricing from "./screens/drawer/Pricing/Pricing";
import TradingJournal from "./screens/drawer/TradingJournal";
import SignIn from "./components/onboarding/SignIn";
import SignUn from "./components/onboarding/SignUp";
import { AuthContext } from "./context/AuthContext";
import Notification from "./screens/stack/Notification";
import NoteBottom from "./screens/stack/NoteBottom";
import TradeDetail from "./screens/stack/TradeDetail";
import Dashboard from "./components/dashboard/Dashboard";
import TradeAnalysis from "./screens/tabs/TradeAnalysis";
import PriceAlert from "./screens/tabs/PriceAlert";
import Profile from "./screens/tabs/Profile";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TradeDetails from "./screens/stack/TradeDetails";
import BottomSlide from "./components/BottomSlide";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const AuthenticationStack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <AuthenticationStack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUn} />
      <Stack.Screen
        name="Home"
        component={StackNavigation}
        options={{
          headerShown: false,
        }}
      />
    </AuthenticationStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerTintColor: COLORS.lightWhite,
        headerTitleStyle: styles.headertitle,
        drawerActiveBackgroundColor: COLORS.appBackground,
        drawerLabelStyle: styles.label,
        drawerContentStyle: styles.drawerContent,
        drawerStyle: { width: 240 },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            let iconName = "home-outline";
            return (
              <Ionicons name={iconName} size={size} color={COLORS.lightWhite} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: styles.header,
          drawerIcon: ({ color, focused, size }) => {
            let iconName = "person-outline";
            return (
              <Ionicons name={iconName} size={size} color={COLORS.lightWhite} />
            );
          },
        }}
      />

      <Drawer.Screen
        name="TradingJournal"
        component={TradingJournal}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          drawerIcon: ({ color, focused, size }) => {
            let iconName = "ios-bookmarks-outline";
            return (
              <Ionicons name={iconName} size={size} color={COLORS.lightWhite} />
            );
          },
        }}
      />

      <Drawer.Screen
        name="Pricing"
        component={Pricing}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitleAlign: "center",
          drawerIcon: ({ color, focused, size }) => {
            let iconName = "cash-outline";
            return (
              <Ionicons name={iconName} size={size} color={COLORS.lightWhite} />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigation}
        options={{
          header: () => <StatusBar style="light" />,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Details"
        component={TradeDetail}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="RiskAnalysis"
        component={RiskAnalysis}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="SetAlert"
        component={SetAlert}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AlertDetails"
        component={AlertDetails}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={NoteBottom}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      {/* <Stack.Screen
        name="TradeDetail"
        component={TradeDetail}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      /> */}
      
      <Stack.Screen
        name="AutoTrader"
        component={AutoTrader}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Accounts"
        component={Account}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}

const StackNavigation = () => {
  return (
    <Stack.Navigator>
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
  const navigation = useNavigation();

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
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-settings" : "ios-settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: COLORS.darkyellow,
        tabBarStyle: { backgroundColor: "#111", height: 65 },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerStyle: styles.header,
        headerTitleStyle: styles.headertitle,
        headerTitleAlign: "center",
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={menu}
              dimension="60%"
              handlePress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={notification}
              dimension="60%"
              handlePress={() => {
                navigation.navigate("Notifications");
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={TradeAnalysis}
        options={{
          headerRight: () => <View></View>,
        }}
      />
      <Tab.Screen
        name="PriceAlert"
        component={PriceAlert}
        options={{
          headerRight: () => <View></View>,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Profile}
        options={{
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={notification}
              dimension="60%"
              handlePress={() => {
                navigation.navigate("Notifications");
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Navigation = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  console.log(userToken);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken == null ? <AuthStack /> : <StackNavigation />}
      <StatusBar style="light" />
    </NavigationContainer>
  );
};
  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            if (route.name === "Dashboard") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Analysis") {
              iconName = focused ? "md-analytics" : "md-analytics-outline";
            } else if (route.name === "PriceAlert") {
              iconName = focused
                ? "md-alert-circle"
                : "md-alert-circle-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-settings" : "ios-settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: COLORS.darkyellow,
          tabBarStyle: {
            backgroundColor: "#111",
            height: 65,
            borderRadius: 20,
          },
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
    </View>
  );
};
const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  dashboard: {
    backgroundColor: COLORS.appBackground,
  },
  header: {
    backgroundColor: COLORS.appBackground,
  },
  headertitle: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  logoContainer: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: COLORS.lightWhite,
  },
  drawerContent: {
    justifyContent: "center",
    alignContent: "center",
  },
  logoImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    // marginTop: 10
  },
  // backTitle: {
  //     color: COLORS.white
  // }
});
