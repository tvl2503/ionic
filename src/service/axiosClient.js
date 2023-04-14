import axios from "axios";
import { BASE_URL } from "../constants/api";

const axiosClient  = axios.create({
    baseURL: BASE_URL,
    responseType: "json"
})

axiosClient.defaults.timeout = 20000;
axiosClient.defaults.headers.post["Content-Type"] = "application/json";
axiosClient.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

export default axiosClient;