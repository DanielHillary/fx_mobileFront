import apiAxios from "./axios.config";

export const getUserAccont = async (accountNum) => {
  const response = await apiAxios.get("/account/getaccountdetails", {
    params: { accountNumber : accountNum },
  });
  return response;
};

export const registerMetaApiAccount = async (body) => {
  const response = await apiAxios.post("/metaApi/registermetaapiaccount", body);
  return response;
};

export const getAllUserAccounts = async(userId) => {
  const response = await apiAxios.get("/account/getalluseraccounts", {
    params: { userId: userId },
  })
  return response;
}



