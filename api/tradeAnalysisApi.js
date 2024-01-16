import apiAxios from "./axios.config";

export const getTradeAnalysis = async(orderId) => {
    const response = await apiAxios.get("/tradeanalysisresponse/gettradeanalysis", {
        params: { responseId : orderId }
    })

    return response;
}

export const getResponseRemarks = async (responseId) => {
    const response = await apiAxios.get("/remarks/getresponseremarks", {
        params: { id : responseId}
    })
    return response;
}
