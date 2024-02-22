import axios from "axios";
import { createAxiosInstance } from "./axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const authToken = await AsyncStorage.getItem("jwtToken");

// export const localHost = "http://192.168.43.131:8080/api";
export const localHost = "https://fxprodev-production.up.railway.app/api";

// const host = "http://192.168.43.131:8080/auth/login";
const host = "https://fxprodev-production.up.railway.app/auth/login"
const host2 = "http://192.168.252.215:8080/auth/login";
// const server = "https://psydtrader-3cc7fe7cf4bb.herokuapp.com/auth/login"

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

// export const fetchUser = (userName, password) => {
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json", // Set the content type to JSON
//       // Add any additional headers as needed
//     },
//     body: JSON.stringify({ userName: userName, userPassword: password }), // Convert the data to JSON format
//   };
//   const response = fetch(host, requestOptions).then((res) => {

//     if (!res.ok) {
//       console.log("something went wrong in here");
//     }
//     return res.json();
//   });

//   return response;
// };

export const registerNewUser = async (body) => {
  const response = await axios.post(`${localHost}/registration/registerNewUser`, body);
  return response;
};

export const saveFireBaseToken = async (token, accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/registration/savefirebasetoken", {
    params: { token: token, userId: accountId },
  });
  return response;
};

export const resetPassword = async (email, password) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/registration/resetpassword", {
    params: { email: email, newPassword: password },
  });
  return response;
};
