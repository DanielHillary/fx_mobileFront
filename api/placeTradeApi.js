import { makeApiCall } from "./fetch.config";
import apiAxios from "./axios.config";


export const executeTrade = async (tradeDetails) => {
  const response = await makeApiCall("/trade/executeorder", tradeDetails);
  return response;
};

export const executeAdvancedOrder = async(tradeDetails) => {
  const response = await apiAxios.post("/trade/executeadvancedorder", tradeDetails);
  return response;
} 

export const closeMultipleTrades = async (accountId, symbol) => {
  const response = await apiAxios.get("/trade/closemultipletradesbyasset", {
    params: { metaAccountId: accountId, asset: symbol },
  });

  return response;
};
