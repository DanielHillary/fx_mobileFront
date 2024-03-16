import axios from "axios";
import { createAxiosInstance } from "./axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const authToken = await AsyncStorage.getItem("jwtToken");

export const localHost = "http://192.168.43.131:8080/api";
// export const localHost = "https://psydtrader.uc.r.appspot.com/api";

const host = "http://192.168.43.131:8080/auth/login";
// const host = "https://psydtrader.uc.r.appspot.com/auth/login"
const host2 = "http://192.168.252.215:8080/auth/login";

const headers = {
  "Content-Type": "application/json",
  // 'Authorization': `Bearer ${authToken}`,
};
export const fetchUser = async (userName, password) => {
  const response = await axios.post(host, {
    userName: userName,
    userPassword: password,
  });
  return response;
};

export const registerNewUser = async (body) => {
  const response = await axios.post(
    `${localHost}/registration/registerNewUser`,
    body
  );
  return response;
};

export const emailVerification = async (otp, mail) => {
  const response = await axios.get(`${localHost}/registration/verifycode`, {
    params: { verificationOtp: otp, email: mail },
  });
  return response;
};

export const resentOtpCode = async (mail) => {
  const response = await axios.get(`${localHost}/registration/resendOTP`, {
    params: { email: mail },
  });
  return response;
};

export const saveFireBaseToken = async (token, accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/registration/savefirebasetoken", {
    params: { token: token, userId: accountId },
  });
  return response;
};

export const updateUserInformation = async (body) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.put("/registration/updateuserinfo", body);
  return response;
};

export const resetPassword = async (email, password) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/registration/resetpassword", {
    params: { email: email, newPassword: password },
  });
  return response;
};
