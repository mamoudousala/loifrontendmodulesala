import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://my-json-server.typicode.com/Espenvign/demo",
    timeout: 8000,
});

axiosInstance.interceptors.response.use(
    (res) => res,
    (err) =>
        Promise.reject({
            message: err.response?.data?.message || "API error",
            status: err.response?.status,
        })
)