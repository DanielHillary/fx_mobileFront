import { createAxiosInstance } from "./axios.config"


export const getExitLevelsForTrade = async(tradeId) => {
    const apiAxios = await createAxiosInstance();
    const response = await apiAxios.get("/exitstrategies/getexitstrategiesfortrade", {
        params : { tradeId : tradeId }
    })
    return response;
}

export const executeExitLevel = async(item) => {
    const apiAxios = await createAxiosInstance();
    const response = await apiAxios.post("/trade/executeexitlevel", item);

    return response;
}

