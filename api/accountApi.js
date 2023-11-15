import apiAxios from "./axios.config";

export const getUserAccont = async (userId) => {
  const response = await apiAxios.get("/account/getaccountdetails", {
    params: { userId: userId },
  });
  return response;
};
