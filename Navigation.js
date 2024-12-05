import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
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
import { AuthContext } from "./context/AuthContext";
import NoteBottom from "./screens/stack/NoteBottom";
import TradeDetail from "./screens/stack/TradeDetail";
import TradingBot from "./screens/drawer/TradingBot";
import AddAccount from "./screens/stack/AddAccount";
import SetUpTradingPlan from "./screens/stack/SetUpTradingPlan";
import EntryStrategy from "./components/tradingsystem/EntryStrategy";
import ExitStrategy from "./components/tradingsystem/ExitStrategy";
import RiskManager from "./components/tradingsystem/RiskManager";
import TradingPlan from "./screens/drawer/tradingplan/TradingPlan";
import CreateExit from "./components/tradingsystem/CreateExit";
import SignUp from "./components/onboarding/SignUp";
import AlertHistory from "./screens/tabs/PriceAlert/AlertHistory";
import Notification from "./screens/stack/Notification";
import RecordDetails from "./screens/drawer/RecordDetails";
import ChangePassword from "./components/onboarding/ChangePassword";
import HeaderNotify from "./components/header/HeaderNotify";
import ConfirmEntry from "./screens/stack/ConfirmEntry";
import TradeReport from "./screens/stack/TradeReport";
import AddNewAccount from "./screens/stack/AddNewAccount";
import AddNewEntryStrategies from "./screens/stack/AddNewEntryStrategies";
import AddNewExitStrategy from "./screens/stack/AddNewExitStrategy";
import AddNewRiskManager from "./screens/stack/AddNewRiskRegister";
import SetUpNewTradingPlan from "./screens/stack/SetupNewTradingPlan";
import SuccessPage from "./components/SuccessPage";
import AccountReport from "./screens/stack/AccountReport";
import TradeJournal from "./screens/drawer/TradeJournal";
import WelcomeSlider from "./components/onboarding/slider/WelcomeSlider";
import ForgotPassword from "./components/onboarding/forgotpassword/ForgotPassword";
import ResetPassword from "./components/onboarding/forgotpassword/ResetPassword";
import HistoryDetails from "./screens/tabs/PriceAlert/HistoryDetails";
import VerifyEmail from "./components/onboarding/forgotpassword/VerifyEmail";
import UpdateInfo from "./screens/stack/UpdateInfo";
import VerifyUpdateEmail from "./screens/stack/VerifyUpdateEmail";
import Recommendation from "./screens/drawer/Recommendation";
import ChoosePlan from "./screens/stack/ChoosePlan";
import Price from "./screens/stack/Price";
import StrategyAnalyzer from "./screens/stack/StrategyAnalyzer";
import StrategyAnalysisReport from "./screens/stack/StrategyAnalysisReport";

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
      <AuthenticationStack.Screen name="PsyDTrader" component={WelcomeSlider} />
      <AuthenticationStack.Screen name="SignIn" component={SignIn} />
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen name="AddAccount" component={AddAccount} />
      <AuthenticationStack.Screen name="ChoosePlan" component={ChoosePlan} />
      <AuthenticationStack.Screen name="Pricing" component={Price} />
      <AuthenticationStack.Screen
        name="EntryStrategy"
        component={EntryStrategy}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <AuthenticationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <AuthenticationStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <AuthenticationStack.Screen
        name="ExitStrategy"
        component={ExitStrategy}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <AuthenticationStack.Screen
        name="RiskManager"
        component={RiskManager}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />
      <AuthenticationStack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <AuthenticationStack.Screen
        name="SetUpTradingPlan"
        component={SetUpTradingPlan}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />
      <AuthenticationStack.Screen
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
        name="Accounts"
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
        component={TradeJournal}
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
        name="AutoTrader"
        component={TradingBot}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          drawerIcon: ({ color, focused, size }) => {
            let iconName = "flash-auto";
            return (
              <MaterialIcons
                name={iconName}
                size={size}
                color={COLORS.lightWhite}
              />
            );
          },
        }}
      />

      <Drawer.Screen
        name="TradePlan"
        component={TradingPlan}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          drawerIcon: ({ color, focused, size }) => {
            let iconName = "floor-plan";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={COLORS.lightWhite}
              />
            );
          },
        }}
      />

      <Drawer.Screen
        name="Strategy Analyzer"
        component={StrategyAnalyzer}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitleAlign: "center",
          drawerIcon: ({ color, focused, size }) => {
            let iconName = "analytics-outline";
            return (
              <Ionicons name={iconName} size={size} color={COLORS.lightWhite} />
            );
          },
        }}
      />

      <Drawer.Screen
        name="Price Alert"
        component={SetAlert}
        options={{
          headerShown: true,
          headerStyle: styles.header,
          headerTitleAlign: "center",
          drawerIcon: ({ color, focused, size }) => {
            let iconName = "ios-pencil";
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

      <Drawer.Screen
        name="PsyD Recommendation"
        component={Recommendation}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: styles.header,
          drawerIcon: ({ color, focused, size }) => {
            let iconName = "newspaper-outline";
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
        headerTitle: "",
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
        name="TradeJournal"
        component={TradeJournal}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="HistoryDetails"
        component={HistoryDetails}
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
        name="AlertHistory"
        component={AlertHistory}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddNewAccount"
        component={AddNewAccount}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddNewEntryStrategies"
        component={AddNewEntryStrategies}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddNewRiskRegister"
        component={AddNewRiskManager}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="SetupNewTradingPlan"
        component={SetUpNewTradingPlan}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddNewExitStrategy"
        component={AddNewExitStrategy}
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
        component={Notification}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddAccount"
        component={AddAccount}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="EntryStrategy"
        component={EntryStrategy}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="UpdateInfo"
        component={UpdateInfo}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="VerifyUpdateEmail"
        component={VerifyUpdateEmail}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="ExitStrategy"
        component={ExitStrategy}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="RiskManager"
        component={RiskManager}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Plan"
        component={TradingPlan}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="RecordDetails"
        component={RecordDetails}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="CreateExit"
        component={CreateExit}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="SetUpTradingPlan"
        component={SetUpTradingPlan}
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
      />

      <Stack.Screen
        name="SuccessPage"
        component={SuccessPage}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AccountReport"
        component={AccountReport}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="StrategyAnalysis"
        component={StrategyAnalyzer}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="PlanReport"
        component={StrategyAnalysisReport}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="ConfirmEntry"
        component={ConfirmEntry}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="TradeReport"
        component={TradeReport}
        options={{
          presentation: "modal",
          headerStyle: styles.header,
          headerTitleStyle: styles.headertitle,
          headerTitleAlign: "center",
        }}
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
        headerTitle: "",
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
            <HeaderNotify
              iconUrl={notification}
              dimension="60%"
              handlePress={() => {
                navigation.navigate("Notifications");
              }}
            />
          ),
          headerTitle: "Dashboard",
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
            <HeaderNotify
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
  // console.log(userToken);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        {userToken == null ? <AuthStack /> : <StackNavigation />}
        <StatusBar style="light" />
      </NavigationContainer>
    </>
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
