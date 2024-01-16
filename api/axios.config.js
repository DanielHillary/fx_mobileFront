import axios from "axios";

const localHost = "http://192.168.43.131:8080/api"
const localHost2 = "http://192.168.252.215:8080/api";
const server = "https://psydtrader-3cc7fe7cf4bb.herokuapp.com/api"

const apiAxios = axios.create({
    baseURL: localHost,
    headers: { "Content-Type" : "application/json"}
})

export default apiAxios;