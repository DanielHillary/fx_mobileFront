import apiAxios from "./axios.config"
import { makeApiCall } from "./fetch.config"

export const getAllActiveAlerts = (accountId) => {
    
    const response = apiAxios.get("/dashboard/getactivealerts")
}