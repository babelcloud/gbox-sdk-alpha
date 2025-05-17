import axios, { AxiosInstance } from 'axios';

function getHttp(baseURL: string, apiKey: string): AxiosInstance {
    const http = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${apiKey}`,
        },
    });

    return http;
}

export default getHttp; 