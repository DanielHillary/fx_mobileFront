import apiAxios from "./axios.config";

export const createAlert = (userName, password) => {
    const response = apiAxios.post("/watchlist/addtowatchlist", {
        userName: userName,
        userPassword: password
    })

    return response;
}

export const getAllUserAlert = (accountId) => {
    const response = apiAxios.get("/watchlist/getuserwatchlist", { params: accountId })
    return response;
}