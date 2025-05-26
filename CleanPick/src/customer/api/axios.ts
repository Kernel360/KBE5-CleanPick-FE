import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
});

// 모든 요청에 JWT 토큰을 자동으로 추가
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token'); // 또는 'accessToken' 등 실제 저장된 key로 변경
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

export default api;