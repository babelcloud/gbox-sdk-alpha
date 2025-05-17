


import axios from 'axios';

function getHttp(baseURL, apiKey) {
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
