import axios, { AxiosInstance } from 'axios';

function getHttp(baseURL: string, apiKey: string): AxiosInstance {
    const http = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${apiKey}`,
        },
    });

    // 添加响应拦截器处理错误
    http.interceptors.response.use(
        response => response,
        error => {
            const errorMessage = error.response
                ? `Request error: ${error.response.status} ${error.response.statusText} - ${JSON.stringify(error.response.data)}`
                : error.request
                    ? 'Request sent but no response received'
                    : `Request configuration error: ${error.message}`;
            
            console.error('HTTP error:', errorMessage);
            
            return Promise.reject(errorMessage);
        }
    );

    return http;
}

export default getHttp; 