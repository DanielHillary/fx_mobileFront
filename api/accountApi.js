import { createAxiosInstance } from "./axios.config";
import axios from "axios";
import { localHost } from "./userApi"

export const getUserAccont = async (accountNum) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/account/getaccountdetails", {
    params: { accountNumber : accountNum },
  });
  return response;
};

export const registerMetaApiAccount = async (body) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.post("/metaApi/registermetaapiaccount", body);
  return response;
};

export const registerNewMetaApiAccount = async (body) => {
  const response = await axios.post(`${localHost}/general/registerfirstmetaapiaccount`, body);
  return response;
};

export const registerDummyAccount = async (body) => {
  const response = await axios.post(`${localHost}/general/createdummyaccount`, body);
  return response;
}

export const getAllUserAccounts = async(userId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/account/getalluseraccounts", {
    params: { userId: userId },
  })
  return response;
}

export const updateAccountMode = async(accountId, mode) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/account/updateaccountmode", {
    params: { accountId: accountId, strict: mode},
  })
  return response;
}

export const getTodayReport = async(accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/account/generatedailyreport", {
    params: { accountId : accountId}
  })
  return response;
}

export const getWeeklyReport = async(accountId, val) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/account/generatereportpertime", {
    params: { accountId : accountId, range : val}
  })
  return response;
}

export const updateAcccountPaymentStatus = async (accountId, fee) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/account/updatepaymentstatus", {
    params: { accountId: accountId, amount: fee}
  })
  return response;
}



