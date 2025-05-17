import getHttp from './src/http.js';

const defaultBaseUrl = 'https://gboxes.app';
const defaultApiKey = process.env.GBOX_API_KEY;
const envBaseUrl = process.env.GBOX_BASE_URL;

export default class GboxClient {
    constructor({
        apiKey,
        baseUrl,
    }) {
        this.androidSandboxId = null;
        const key = apiKey || defaultApiKey;
        if (!key) {
            throw new Error('GBOX_API_KEY is not set on environment variables');
        }
        const baseUrl = baseUrl || envBaseUrl || defaultBaseUrl;

        this.http = getHttp(baseUrl, key);
    }

    async initAndroid() {
        const android = await new AndroidGbox(this.http);
        return android;
    }
}

const gbox = new GboxClient();



