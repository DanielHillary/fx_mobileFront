import { createAxiosInstance } from "./axios.config";

export const getTradeAnalysis = async(orderId) => {
    const apiAxios = await createAxiosInstance();
    const response = await apiAxios.get("/tradeanalysisresponse/gettradeanalysis", {
        params: { responseId : orderId }
    })

    return response;
}

export const getResponseRemarks = async (responseId) => {
    const apiAxios = await createAxiosInstance();
    const response = await apiAxios.get("/remarks/getresponseremarks", {
        params: { id : responseId}
    })
    return response;
}
