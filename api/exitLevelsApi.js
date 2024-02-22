import apiAxios, { createAxiosInstance } from "./axios.config"


export const getExitLevelsForTrade = async(tradeId) => {
    const apiAxios = await createAxiosInstance();
    const response = await apiAxios.get("/exitstrategies/getexitstrategiesfortrade", {
        params : { tradeId : tradeId }
    })
    return response;
}