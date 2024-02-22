import { createAxiosInstance } from "./axios.config";

export const createAlert = async (body) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.post("/watchlist/addtowatchlist", body);
  return response;
};

export const getAllUserAlert = async (accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/watchlist/getuserwatchlist", {
    params: { accountId: accountId },
  });
  return response;
};

export const getAlertsByRagne = async (accountId, range) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/watchlist/getalertsbytimerange", {
    params: { accountId: accountId, days: range },
  });
  return response;
};

export const getAlertsByDateRange = async (accountId, startDate, endDate) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/watchlist/getalertsbydaterange", {
    params: { startDate: startDate, endDate: endDate, accountId: accountId },
  });
  return response;
};

export const getAlertsForTheDay = async (accountId) => {
  const apiAxios = await createAxiosInstance();
  const resposne = await apiAxios.get("/watchlist/getalertsfortoday", {
    params: { accountId: accountId },
  });
  return resposne;
};

export const searchForSymbol = async (accountId, asset, active) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/watchlist/getalertsbysymbol", {
    params: { symbol: asset, accountId: accountId, active: active },
  });
  return response;
};

export const disableAsset = async (alertId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/watchlist/deactivatealert", {
    params: { alertId: alertId },
  });
  return response;
};
