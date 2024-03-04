import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUser, saveFireBaseToken } from "../api/userApi";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { loadCustomFont } from "../components/exits/exitlevelcard.style";
import { loadThemeCustomFont } from "../constants/theme";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [isCompletePlan, setIsCompletePlan] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [isPaidAccount, setIsPaidAccount] = useState(true);

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

  const login = async (email, password) => {
    let userDetails = {};
    // const userId = '';
    let check = true;
    try {
      setIsLoading(false);
      const response = await fetchUser(email, password).then((res) => {
        return res.data;
      });
      if(response.status){
        // console.log(response.data);
        userDetails = response.data;

        console.log("User details: " + response.data.jwtToken);
        setUserInfo(userDetails);
        setUserToken(JSON.stringify(userDetails.jwtToken));

        AsyncStorage.setItem("userInfo", JSON.stringify(userDetails));
        AsyncStorage.setItem("jwtToken", userDetails.jwtToken);
        // console.log(userDetails);
      }
      return response
    } catch (error) {
      console.log(error.response.status);
      setIsLoading(false);
      Alert.alert("Invalid credentials", "Please enter valid username and password");
    }
  };

  const logout = () => {
    setIsLoading(false);
    setUserToken(null);
    AsyncStorage.removeItem("jwtToken");
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("accountInfo");
  };

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      let tokenValue = await AsyncStorage.getItem("jwtToken");
      let user = await AsyncStorage.getItem("userInfo");
      let userInf = JSON.parse(user);

      // console.log("User Information: " + userInf)

      if (userInf) {
        setUserToken(tokenValue);
        setUserInfo(userInf);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateAccount = (account) => {
    setAccountDetails(account);
  };

  const updatePaymentStatus = (value) => {
    setIsPaidAccount(value);
  }

  const updateCompleted = (value) => {
    setIsCompletePlan(value);
  };

  const updateNotification = (value) => {
    setHasNotification(value);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        userInfo,
        isPaidAccount,
        updateAccount,
        updateCompleted,
        updateNotification,
        updatePaymentStatus,
        isCompletePlan,
        accountDetails,
        hasNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
