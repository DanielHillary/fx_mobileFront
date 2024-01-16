import apiAxios from "./axios.config";

export const createAlert = async (userName, password) => {
  const response = await apiAxios.post("/watchlist/addtowatchlist", {
    userName: userName,
    userPassword: password,
  });

  return response;
};

export const getAllUserAlert = async (accountId) => {
  const response = await apiAxios.get("/watchlist/getuserwatchlist", {
    params: { accountId: accountId },
  });
  return response;
};

