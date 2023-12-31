import apiAxios from "./axios.config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authToken = AsyncStorage.getItem("jwtToken");

const host = "http://192.168.43.131:8080/auth/login";
const localHost = "http://192.168.247.215:8080/auth/login";
// const server = "https://psydtrader-3cc7fe7cf4bb.herokuapp.com/auth/login"

const headers = {
  "Content-Type": "application/json",
  // 'Authorization': `Bearer ${authToken}`,
};
// export const fetchUser = (userName, password) => {
//     const response = axios.post(server, {
//         userName: userName,
//         userPassword: password
//     })

//     return response;
// }

export const fetchUser = (userName, password) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
      // Add any additional headers as needed
    },
    body: JSON.stringify({ userName: userName, userPassword: password }), // Convert the data to JSON format
  };
  const response = fetch(host, requestOptions).then((res) => {
    
    if (!res.ok) {
      console.log("something went wrong");
    }
    return res.json();
  });

  return response;
};
