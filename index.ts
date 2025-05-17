import getHttp from './src/http';
import AndroidGbox from './src/android';
import { AxiosInstance } from 'axios';

const defaultBaseUrl = 'https://gboxes.app';
const defaultApiKey = process.env.GBOX_API_KEY;
const envBaseUrl = process.env.GBOX_BASE_URL;

interface GboxClientOptions {
    apiKey?: string;
    baseUrl?: string;
}

export default class GboxClient {
    private http: AxiosInstance;
    private androidSandboxId: string | null;

    constructor(options: GboxClientOptions = {}) {
        this.androidSandboxId = null;
        const key = options.apiKey || defaultApiKey;
        
        if (!key) {
            throw new Error('GBOX_API_KEY is not set on environment variables');
        }
        
        const baseUrlValue = options.baseUrl || envBaseUrl || defaultBaseUrl;

        this.http = getHttp(baseUrlValue, key);
    }

    async initAndroid(): Promise<AndroidGbox> {
        const android = await new AndroidGbox(this.http);
        return android;
    }
}

// Export an instance for convenience
export const gbox = new GboxClient(); 