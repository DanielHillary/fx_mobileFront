// export const baseURL = "http://192.168.73.215:8080/api";

export const baseURL = "https://fxprodev.onrender.com/api";

export const baseUrL = "https://fxprodev.onrender.com/api"

export const makeApiCall = async (url, body) => {

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${authToken}`,
    },
    body: body == null ? JSON.stringify({}) : JSON.stringify(body)
  };
  const fullURL = `${baseUrL}${url}`;

  const response = await fetch(fullURL, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
