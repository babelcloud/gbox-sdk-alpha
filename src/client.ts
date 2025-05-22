

import getHttp from './http';
import AndroidGbox from './android';
import { AxiosInstance } from 'axios';
import { TerminalGbox } from './terminal';
import { Architecture } from './type';

const defaultBaseUrl = 'https://alpha.gbox.cloud';

interface GboxClientOptions {
    apiKey?: string;
    baseUrl?: string;
}

interface initAndroidOptions {
    boxId?: string;
    arch?: Architecture
}

interface initTerminalOptions {
    boxId?: string;
}

export class GboxClient {
    private http: AxiosInstance;
    constructor(options: GboxClientOptions = {}) {
        const defaultApiKey = process.env.GBOX_API_KEY;
        const envBaseUrl = process.env.GBOX_BASE_URL;
        const key = options.apiKey || defaultApiKey;

        if (!key) {
            throw new Error('GBOX_API_KEY is not set on environment variables');
        }

        const baseUrlValue = options.baseUrl || envBaseUrl || defaultBaseUrl;

        this.http = getHttp(baseUrlValue, key);
    }

    async initAndroid(options?: initAndroidOptions): Promise<AndroidGbox> {
        const { boxId, arch } = options || {};
        const android = await new AndroidGbox(this.http, boxId, arch);
        return android;
    }

    async initTerminal(options?: initTerminalOptions): Promise<TerminalGbox> {
        const { boxId } = options || {};
        const terminal = await new TerminalGbox(this.http, boxId);
        return terminal;
    }
}