import { AxiosInstance } from 'axios';
import { Architecture } from './type';
type Point = [number, number];
type AndroidResponse = {
    sandboxId?: string;
    screenshot?: string;
    [key: string]: any;
};

export default class AndroidGbox {
    private http: AxiosInstance;
    public sandboxId: string | null;
    public arch: Architecture;

    constructor(http: AxiosInstance, boxId?: string, arch?: Architecture) {
        this.http = http;
        this.sandboxId = boxId || null;
        if(arch) {
            if (Object.values(Architecture).includes(arch)) {
                this.arch = arch;
            } else {
                throw new Error(`Invalid architecture type: ${arch}. Should be one of the values in the Architecture enum.`);
            }
        }else{
            this.arch = Architecture.ARM64;
        }
        const init = async (): Promise<AndroidGbox> => {
            if (boxId) {
                this.sandboxId = boxId;
                return this;
            }else{
                const { data } = await this.http.post('/api/v1/gbox/android/create', {
                    architecture: this.arch,
                });
                this.sandboxId = data.uid;
                return this;
            }
        };
        return init() as unknown as AndroidGbox;
    }

    async screenshot(): Promise<string> {
        const { data } = await this.http.post(`/api/v1/gbox/android/screenshot`, {
            uid: this.sandboxId,
        });
        return data.url;
    }

    async click(x: number, y: number): Promise<AndroidResponse> {
        const { data } = await this.http.post(`/api/v1/gbox/android/click`, { x, y, 
            uid: this.sandboxId,
         });
        return data;
    }

    async scroll(start: Point, end: Point): Promise<AndroidResponse> {
        const [startX, startY] = start;
        const [endX, endY] = end;
        const { data } = await this.http.post(`/api/v1/gbox/android/scroll`, { startX, startY, endX, endY, uid: this.sandboxId });
        return data;
    }

    async keypress(key: string): Promise<AndroidResponse> {
        const { data } = await this.http.post(`/api/v1/gbox/android/keyPress`, { key, 
            uid: this.sandboxId,
         });
        return data;
    }

    async type(text: string): Promise<AndroidResponse> {
        const { data } = await this.http.post(`/api/v1/gbox/android/type`, { text, 
            uid: this.sandboxId,
         });
        return data;
    }

    async getDeviceScreenSize(): Promise<Point> {
        const { data } = await this.http.post(`/api/v1/gbox/android/deviceScreenSize`, {
            uid: this.sandboxId,
        });
        return data;
    }

    async drag(start: Point, end: Point, duration: number): Promise<AndroidResponse> {
        const [startX, startY] = start;
        const [endX, endY] = end;
        const { data } = await this.http.post(`/api/v1/gbox/android/drag`, { startX, startY, endX, endY, ms: duration, uid: this.sandboxId });
        return data;
    }
} 