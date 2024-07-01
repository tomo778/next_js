import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        switch (error.response?.status) {
            case 422:
                console.log(error.response?.data);
                return Promise.reject(error.response?.data);
            case 404:
                console.log(error.response?.data);
                return Promise.reject(error.response?.data);
            case 500:
                console.log(error.response?.data);
                return Promise.reject(error.response?.data);
            default:
                console.log(error.response?.data);
                return Promise.reject(error.response?.data);
        }
    }
);

export default instance;
