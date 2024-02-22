import axios from "axios";
import { createAxiosInstance } from "./axios.config";
import { localHost } from "./userApi";

export const registerTradingPlan = async (body) => {
  const response = await axios.post(`${localHost}/general/createtradingplan`, body);
  return response;
};

export const registerEntryStrategy = async (body) => {
  const response = await axios.post(
    `${localHost}/general/createentrystrategy`,
    body
  );
  return response;
};

export const getEntries = async (accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/entrystrategy/getentrytechniques", {
    params: { accountId: accountId },
  });
  return response;
};

export const getEntryTechniques = async (accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get(
    "/entrystrategy/getaccountentrytechniques",
    {
      params: { accountId: accountId },
    }
  );
  return response;
};

export const registerLossExitStrategy = async (body) => {
  const response = await axios.post(
    `${localHost}/general/createexitstrategyforloss`,
    body
  );
  return response;
};

export const registerNewLossExitStrategy = async (body) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.post(
    `/exitstrategies/createnewexitstrategyforloss`,
    body
  );
  return response;
};

export const updateLossExitStrategies = async (body) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.post(
    "/exitstrategies/updatelossexitstrategy",
    body
  );
  return response;
};

export const updateProfitExitStrategies = async (body) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.post(
    "/exitstrategies/updateprofitexitstrategy",
    body
  );
  return response;
};

export const deleteProfitExit = async (userId, count) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.delete("/exitstrategies/deleteprofitexit", {
    params: { accountId: userId, count: count },
  });
  return response;
};

export const deleteLossExit = async (userId, levelId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.delete("/exitstrategies/deletelossexit", {
    params: { accountId: userId, exitId: levelId },
  });
  return response;
};

export const registerProfitExitStrategy = async (body) => {
  const response = await axios.post(
    `${localHost}/general/createexitstrategyforprofit`,
    body
  );
  return response;
};

export const registerNewProfitExitStrategy = async (body) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.post(
    `/exitstrategies/createnewexitstrategyforprofit`,
    body
  );
  return response;
};

export const updateEntryStrategies = async (body) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.post(
    "/entrystrategy/updateentrystrategies",
    body
  );
  return response;
};

export const getExitsForTradingPlan = async (planId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get(
    "/exitstrategies/getexitstrategiesforaccount",
    {
      params: { planId: planId },
    }
  );
  return response;
};

export const createRiskRegister = async (body) => {
  const response = await axios.post(
    `${localHost}/general/createriskmangementrule`,
    body
  );
  return response;
};

export const getRiskManager = async (planId) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/riskmanagement/getriskregister", {
    params: { planId: planId },
  });
  return response;
};

export const updateRiskRegister = async (body) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.put(
    "/riskmanagement/updateriskmanagement",
    body
  );
  return response;
};
