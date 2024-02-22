import apiAxios, { createAxiosInstance } from "./axios.config"
import { makeApiCall } from "./fetch.config"

const apiAxios = await createAxiosInstance();

export const getAllActiveAlerts = (accountId) => {
    const response = apiAxios.get("/dashboard/getactivealerts")
    return response;
}