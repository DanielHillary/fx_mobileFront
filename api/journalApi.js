import { createAxiosInstance } from "./axios.config";

export const getAllTradeRecords = async (accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.get("/tradejournal/getallrecordsfromjournal", {
    params: { accountId: accountId },
  });

  return response;
};

export const getTradesByWeek = async (accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.get("/tradejournal/getrecordsbyweek", {
    params: { accountId: accountId },
  });
  return response;
};

export const getTradesByMonth = async (accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.get("/tradejournal/getrecordsbymonth", {
    params: { accountId: accountId },
  });
  return response;
};

export const getTradesByDay = async (accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.get("/tradejournal/getrecordsbyday", {
    params: { accountId: accountId },
  });
  return response;
};

export const getTradesByRange = async (startDate, endDate, accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.get("/tradejournal/getrecordsbydaterange", {
    params: { accountId: accountId, startDate: startDate, endDate: endDate },
  });

  return response;
};

export const getTradeChanges = async (id) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.get("/tradechanges/getchangesfortrade", {
    params: { tradeId: id },
  });
  return response;
};

export const getTradeNotes = async (tradeId) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.get("/tradenotes/gettradenotes", {
    params: { tradeId: tradeId },
  });
  return response;
};

export const saveTradingNotes = async (tradeNote) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.post("/tradenotes/addnotetotrade", tradeNote);
  return response;
};

export const updateTradeNotes = async (tradeNote) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.put("/tradenotes/updatetradenote", tradeNote);
  return response;
};

export const searchForSymbol = async (accountId, asset) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.get("/tradejournal/getrecordsbysymbol", {
    params: { accountId: accountId, symbol: asset },
  });
  return response;
};
