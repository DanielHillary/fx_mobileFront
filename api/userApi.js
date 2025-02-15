import axios from "axios";
import { createAxiosInstance } from "./axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const authToken = await AsyncStorage.getItem("jwtToken");

export const localHost = "http://192.168.149.215:8080/api/v1";
// export const localHost = "https://fxprodev.onrender.com/api";

const host = "http://192.168.149.215:8080/api/v1/auth/login";
// const host = "https://fxprodev.onrender.com/auth/login";

const headers = {
  "Content-Type": "application/json",
  // 'Authorization': `Bearer ${authToken}`,
};
export const fetchUser = async (userName, password) => {
  const response = await axios.post(host, {
    email: userName,
    password: password,
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

export const forgotUserPassword = async (userName) => {
  const response = await axios.get(
    `${localHost}/registration/forgotpassword`,
    {
      params: { email: userName },
    }
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
  const response = await apiAxios.get("/v1/registration/savefirebasetoken", {
    params: { token: token, userId: accountId },
  });
  return response;
};

export const updateUserInformation = async (body) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.put("/v1/registration/updateuserinfo", body);
  return response;
};

export const resetPassword = async (email, password) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/v1/registration/resetpassword", {
    params: { email: email, newPassword: password },
  });
  return response;
};
