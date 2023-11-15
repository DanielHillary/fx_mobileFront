import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUser } from "../api/userApi";
import { getUserAccont } from "../api/accountApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    let userInfo = {};
    // const userId = '';
    let check = true;
    try {
      setIsLoading(false);
      fetchUser(email, password).then((res) => {
        userInfo = res.data
        setUserInfo(userInfo);
        setUserId(userInfo.user.userId)
        setUserToken(JSON.stringify(userInfo.jwtToken));
        

        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("jwtToken", userInfo.jwtToken);
      });

      if (userInfo == null) {
        check = false
      } else {
        check = true;
        setIsLoading(false);
      }

      return check;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsLoading(false);
    setUserToken(null);
    AsyncStorage.removeItem("jwtToken");
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem('userId')
  };

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      let tokenValue = await AsyncStorage.getItem("jwtToken");
      let user = await AsyncStorage.getItem("userInfo");
      let userInfo = JSON.parse(user)

      // console.log(userInfo);

      if (userInfo) {
        setUserToken(tokenValue);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
