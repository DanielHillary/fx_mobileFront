import { createAxiosInstance } from "./axios.config";

export const executeTrade = async (tradeDetails) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.post("/trade/executeorder", tradeDetails);
  return response;
};

export const executeAdvancedOrder = async (tradeDetails) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.post(
    "/trade/executeadvancedorder",
    tradeDetails
  );
  return response;
};

export const voiceTradeOrder = async (body) =>{
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.post("/trade/audiorequest", body);
  return response;
}

export const confirmEntries = async (orderId, percent, setupList) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/trade/confirmentries", {
    params: { metaOrderId: orderId, compliance: percent, setupList: setupList },
  });
  return response;
};

export const closeMultipleTrades = async (accountId, symbol) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/trade/closemultipletradesbyasset", {
    params: { metaAccountId: accountId, asset: symbol },
  });

  return response;
};
