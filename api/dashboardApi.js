import apiAxios from "./axios.config";
// const server = "https://psydtrader-3cc7fe7cf4bb.herokuapp.com/api/dashboard/userdashboard"
const server = "http://192.168.43.131:8080/api/dashboard/userdashboard"


export const getUserDashboard = (userId) => {
  const queryParam = "userId";
  const paramValue = userId;

  const params = `${server}?${queryParam}=${userId}`;
  const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        // Add any additional headers as needed
      },
  };
  const response = fetch(params, requestOptions);

  return response
}