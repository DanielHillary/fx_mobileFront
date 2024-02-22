import { createAxiosInstance } from "./axios.config";

export const getUserDashboardInfo = async (accountId, accountNumber) => {
  const apiAxios = await createAxiosInstance();
  const response = await apiAxios.get("/dashboard/userdashboard", {
    params: { userId : accountId, accountNumber : accountNumber}
  })

  return response;
}

export const getAllActiveAlerts = async(accountId) => {
  const apiAxios = await createAxiosInstance();
  const response = apiAxios.get("/dashboard/getactivealerts", {
    params: { accountId: accountId },
  });

  return response;
};

export const getAllActiveTrades = async(accountId) => {
  const apiAxios = await createAxiosInstance();
  
  const response = apiAxios.get("/dashboard/getactivetrades", {
    params: { metaId : accountId },
  });

  return response;
};
