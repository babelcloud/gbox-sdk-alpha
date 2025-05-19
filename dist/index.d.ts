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
    constructor(http: AxiosInstance, boxId?: string);
    screenshot(): Promise<string>;
    click(x: number, y: number): Promise<AndroidResponse>;
    scroll(start: Point, end: Point): Promise<AndroidResponse>;
    keypress(key: string): Promise<AndroidResponse>;
    type(text: string): Promise<AndroidResponse>;
    getDeviceScreenSize(): Promise<Point>;
    drag(start: Point, end: Point, duration: number): Promise<AndroidResponse>;
}

declare enum Language {
    PYTHON = "python",
    JAVASCRIPT = "javascript"
}

declare class TerminalGbox {
    private http;
    sandboxId: string | null;
    constructor(http: AxiosInstance, boxId?: string);
    runCode(code: string, language?: Language): Promise<string>;
    runCommand(command: string): Promise<string>;
}

interface GboxClientOptions {
    apiKey?: string;
    baseUrl?: string;
}
declare class GboxClient {
    private http;
    constructor(options?: GboxClientOptions);
    initAndroid(boxId?: string): Promise<AndroidGbox>;
    initTerminal(boxId?: string): Promise<TerminalGbox>;
}

export { GboxClient, Language };
