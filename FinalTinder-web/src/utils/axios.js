import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://devconnect-fullstack-864c.onrender.com",
    withCredentials: true, // This is mandatory
});

export default axiosInstance;
