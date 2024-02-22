import { createAxiosInstance } from "./axios.config";

export const getNotifications = async (accountId) => {
    const apiAxios = await createAxiosInstance();
    const response = await apiAxios.get("/notifications/getaccountnotifications", {
        params: { accountId : accountId}
    });
    return response;
}

export const removeFromList = async(item) => {
    const apiAxios = await createAxiosInstance();
    const response = await apiAxios.delete("notifications/removefromlist", {
        params: { id : item }
    })

    return response;
}

export const getAlertCategory = async(id, category) => {
    const apiAxios = await createAxiosInstance();
    const response = await apiAxios.get("notifications/getbynotificationcategory", {
        params: {accountId : id, category : category}
    })
    return response;
}