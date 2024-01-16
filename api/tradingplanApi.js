import apiAxios from "./axios.config";

export const registerTradingPlan = async (body) => {
  const response = await apiAxios.post("/tradingplan/createtradingplan", body);
  return response;
};

export const registerEntryStrategy = async (body) => {
  const response = await apiAxios.post(
    "/entrystrategy/createentrystrategy",
    body
  );
  return response;
};

export const getEntries = async (accountId) => {
  const response = await apiAxios.get("/entrystrategy/getentrytechniques", {
    params: { accountId: accountId },
  });
  return response;
};

export const getEntryTechniques = async (accountId) => {
  const response = await apiAxios.get(
    "/entrystrategy/getaccountentrytechniques",
    {
      params: { accountId: accountId },
    }
  );
  return response;
};

export const registerLossExitStrategy = async (body) => {
  const response = await apiAxios.post(
    "/exitstrategies/createexitstrategyforloss",
    body
  );
  return response;
};

export const updateLossExitStrategies = async (body) => {
  const response = await apiAxios.post(
    "/exitstrategies/updatelossexitstrategy",
    body
  );
  return response;
};

export const updateProfitExitStrategies = async (body) => {
  const response = await apiAxios.post(
    "/exitstrategies/updateprofitexitstrategy",
    body
  );
  return response;
};

export const deleteProfitExit = async (userId, count) => {
  const response = await apiAxios.delete("/exitstrategies/deleteprofitexit", {
    params: { accountId: userId, count: count },
  });
  return response;
};

export const deleteLossExit = async (userId, levelId) => {
  const response = await apiAxios.delete("/exitstrategies/deletelossexit", {
    params: { accountId: userId, exitId: levelId },
  });
  return response;
};

export const registerProfitExitStrategy = async (body) => {
  const response = await apiAxios.post(
    "/exitstrategies/createexitstrategyforprofit",
    body
  );
  return response;
};

export const updateEntryStrategies = async (body) => {
  const response = await apiAxios.post(
    "/entrystrategy/updateentrystrategies",
    body
  );
  return response;
};

export const getExitsForTradingPlan = async (planId) => {
  const response = await apiAxios.get(
    "/exitstrategies/getexitstrategiesforaccount",
    {
      params: { planId: planId },
    }
  );
  return response;
};

export const createRiskRegister = async (body) => {
  const response = await apiAxios.post(
    "/riskmanagement/createriskmangementrule",
    body
  );
  return response;
};

export const getRiskManager = async (planId) => {
  const response = await apiAxios.get("/riskmanagement/getriskregister", {
    params: { planId: planId },
  });
  return response;
};

export const updateRiskRegister = async (body) => {
  const response = await apiAxios.put(
    "/riskmanagement/updateriskmanagement",
    body
  );
  return response;
};
