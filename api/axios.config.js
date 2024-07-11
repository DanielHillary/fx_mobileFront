import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const localHost = "http://192.168.43.131:8080/api";
// const localHost = "https://psydtrader.uc.r.appspot.com/api"

// Async function to retrieve JWT token
const getAuthToken = async () => {
  try {
    const authToken = await AsyncStorage.getItem("jwtToken");
    if (!authToken) {
      throw new Error("JWT token is missing in AsyncStorage");
    }
    return authToken;
  } catch (error) {
    console.error("Error retrieving JWT token:", error);
    throw error;
  }
};

// Function to create Axios instance with JWT token
const createAxiosInstance = async () => {
  try {
    const authToken = await getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };
    const instance = axios.create({
      baseURL: localHost, // Change to localHost2 or server as needed
      headers: headers,
    });
    return instance;
  } catch (error) {
    console.error("Error creating Axios instance:", error);
    throw error; // Rethrow the error for handling elsewhere
  }
};

export { createAxiosInstance };
