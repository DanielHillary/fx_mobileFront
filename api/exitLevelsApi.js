import apiAxios from "./axios.config"


export const getExitLevelsForTrade = async(tradeId) => {
    const response = await apiAxios.get("/exitstrategies/getexitstrategiesfortrade", {
        params : { tradeId : tradeId }
    })
    return response;
}