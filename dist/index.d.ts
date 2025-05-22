import { AxiosInstance } from 'axios';

declare enum Language {
    PYTHON = "python",
    JAVASCRIPT = "javascript"
}
declare enum Architecture {
    ARM64 = "arm64",
    X86 = "x86"
}

type Point = [number, number];
type AndroidResponse = {
    sandboxId?: string;
    screenshot?: string;
    [key: string]: any;
};
declare class AndroidGbox {
    private http;
    sandboxId: string | null;
    arch: Architecture;
    constructor(http: AxiosInstance, boxId?: string, arch?: Architecture);
    screenshot(): Promise<string>;
    click(x: number, y: number): Promise<AndroidResponse>;
    scroll(start: Point, end: Point): Promise<AndroidResponse>;
    keypress(key: string): Promise<AndroidResponse>;
    type(text: string): Promise<AndroidResponse>;
    getDeviceScreenSize(): Promise<Point>;
    drag(start: Point, end: Point, duration: number): Promise<AndroidResponse>;
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
interface initAndroidOptions {
    boxId?: string;
    arch?: Architecture;
}
interface initTerminalOptions {
    boxId?: string;
}
declare class GboxClient {
    private http;
    constructor(options?: GboxClientOptions);
    initAndroid(options?: initAndroidOptions): Promise<AndroidGbox>;
    initTerminal(options?: initTerminalOptions): Promise<TerminalGbox>;
}

export { Architecture, GboxClient, Language };
