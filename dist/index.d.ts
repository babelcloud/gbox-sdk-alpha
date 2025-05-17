import { AxiosInstance } from 'axios';

type Point = [number, number];
type AndroidResponse = {
    sandboxId?: string;
    screenshot?: string;
    [key: string]: any;
};
declare class AndroidGbox {
    private http;
    sandboxId: string | null;
    constructor(http: AxiosInstance);
    screenshot(): Promise<string>;
    click(x: number, y: number): Promise<AndroidResponse>;
    scroll(start: Point, end: Point): Promise<AndroidResponse>;
    keypress(key: string): Promise<AndroidResponse>;
}

interface GboxClientOptions {
    apiKey?: string;
    baseUrl?: string;
}
declare class GboxClient {
    private http;
    private androidSandboxId;
    constructor(options?: GboxClientOptions);
    initAndroid(): Promise<AndroidGbox>;
}
declare const gbox: GboxClient;

export { GboxClient as default, gbox };
