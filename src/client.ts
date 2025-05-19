

import getHttp from './http';
import AndroidGbox from './android';
import { AxiosInstance } from 'axios';

const defaultBaseUrl = 'https://gboxes.app';
const defaultApiKey = process.env.GBOX_API_KEY;
const envBaseUrl = process.env.GBOX_BASE_URL;

interface GboxClientOptions {
    apiKey?: string;
    baseUrl?: string;
}

export class GboxClient {
    private http: AxiosInstance;
    constructor(options: GboxClientOptions = {}) {
        const key = options.apiKey || defaultApiKey;
    
        if (!key) {
            throw new Error('GBOX_API_KEY is not set on environment variables');
        }
        
        const baseUrlValue = options.baseUrl || envBaseUrl || defaultBaseUrl;

        this.http = getHttp(baseUrlValue, key);
    }

    async initAndroid(boxId?: string): Promise<AndroidGbox> {
        const android = await new AndroidGbox(this.http, boxId);
        return android;
    }
}