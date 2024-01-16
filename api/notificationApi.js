import apiAxios from "./axios.config";

export const getNotifications = async (accountId) => {
    const response = await apiAxios.get("/notifications/getaccountnotifications", {
        params: { accountId : accountId}
    });
    return response;
}

export const removeFromList = async(item) => {
    const response = await apiAxios.delete("notifications/removefromlist", {
        params: { id : item }
    })

    return response;
}