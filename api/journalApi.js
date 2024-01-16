import apiAxios from "./axios.config";

export const getAllTradeRecords = async (accountId) => {
  const response = apiAxios.get("/tradejournal/getallrecordsfromjournal", {
    params: { accountId: accountId },
  });

  return response;
};

export const getTradesByWeek = async(accountId) => {
  const response = apiAxios.get("/tradejournal/getrecordsbyweek", {
    params: { accountId : accountId }
  })
  return response;
}

export const getTradesByMonth = async(accountId) => {
  const response = apiAxios.get("/tradejournal/getrecordsbymonth", {
    params: { accountId : accountId }
  })
  return response;
}

export const getTradesByDay = async(accountId) => {
  const response = apiAxios.get("/tradejournal/getrecordsbyday", {
    params: { accountId : accountId }
  })
  return response;
}

export const getTradesByRange = async(accountId) => {
  const response = apiAxios.get("/tradejournal/getrecordsbydaterange", {
    params: { accountId : accountId }
  })

  return response;
}

export const getTradeChanges = async(id) => {
  const response = apiAxios.get("/tradechanges/getchangesfortrade", {
    params: { tradeId : id }
  })
  return response;
}
