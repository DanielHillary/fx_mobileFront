import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { loadCustomFont } from "./components/exits/exitlevelcard.style";
import { loadThemeCustomFont } from "./constants/theme";
import BottomSlide from "./components/BottomSlide";
import { COLORS, SIZES } from "./constants/theme";
import Navigation from "./Navigation";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import messaging from "@react-native-firebase/messaging";
import { saveFireBaseToken } from "./api/userApi";

const App = () => {
 
  const requestUserPermission = async () => {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      messaging().registerDeviceForRemoteMessages();
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    // if (requestUserPermission()) {
    //   //console.log(tokenKey);
    //   messaging().getToken().then((token) => {
    //     const response = saveFireBaseToken(token, "3037").then((res) => {
    //       return res.data;
    //     })
    //     if(response.status){
    //       console.log(token);
    //     }else {
    //       console.log(response.message);
    //     }
    //   });
    // } else {
    //   console.log("failed attempt" + authStatus);
    // }

    // messaging().onNotificationOpenedApp(async (remoteMessage) => {
    //   console.log(
    //     "Notification caused app to open from background state:",
    //     remoteMessage.notification
    //   );
    //   // navigation.navigate(remoteMessage.data.type);
    // });

    // // // Register background handler
    // messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //   console.log("Message handled in the background!", remoteMessage);
    // });

    // // // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then( async (remoteMessage) => {
    //     if (remoteMessage) {
    //       console.log(
    //         "Notification caused app to open from quit state:",
    //         remoteMessage.notification
    //       );
    //       //  setInitialRoute(remoteMessage.data.type);  e.g. "Settings"
    //     }
    //   });
    // loadCustomFont();
    // loadThemeCustomFont();

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;
  }, []);

  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default App;
