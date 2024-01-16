import apiAxios from "./axios.config";
// const server = "https://psydtrader-3cc7fe7cf4bb.herokuapp.com/api/dashboard/userdashboard"
const server = "http://192.168.43.131:8080/api/dashboard/userdashboard";
const server2 = "http://192.168.252.215:8080/api/dashboard/userdashboard";

export const getUserDashboard = (userId, accountNumber) => {
  const queryParam = "userId";
  const queryParam2 = "accountNumber"
  const paramValue = userId;

  const params = `${server}?${queryParam}=${userId}&${queryParam2}=${accountNumber}`
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
      // Add any additional headers as needed
    },
  };
  const response = fetch(params, requestOptions);

  return response;
};

export const getUserDashboardInfo = async (accountId, accountNumber) => {
  const response = await apiAxios.get("/dashboard/userdashboard", {
    params: { userId : accountId, accountNumber : accountNumber}
  })

  return response;
}

export const getAllActiveAlerts = (accountId) => {
  const response = apiAxios.get("/dashboard/getactivealerts", {
    params: { accountId: accountId },
  });

  return response;
};

export const getAllActiveTrades = (accountId) => {
  const response = apiAxios.get("/dashboard/getactivetrades", {
    params: { metaId : accountId },
  });

  return response;
};
