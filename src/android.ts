import { AxiosInstance } from 'axios';

type Point = [number, number];
type AndroidResponse = {
    sandboxId?: string;
    screenshot?: string;
    [key: string]: any;
};

export default class AndroidGbox {
    private http: AxiosInstance;
    public sandboxId: string | null;

    constructor(http: AxiosInstance) {
        this.http = http;
        this.sandboxId = null;

        const init = async (): Promise<AndroidGbox> => {
            const { data } = await this.http.post('/api/v1/gbox/android/create');
            this.sandboxId = data.sandboxId;
            return this;
        };

        return init() as unknown as AndroidGbox;
    }

    async screenshot(): Promise<string> {
        const { data } = await this.http.post(`/api/v1/gbox/android/screenshot`, {
            uid: this.sandboxId,
        });
        return data.screenshot;
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

    async getDeviceScreenSize(): Promise<Point> {
        const { data } = await this.http.post(`/api/v1/gbox/android/deviceScreenSize`, {
            uid: this.sandboxId,
        });
        return data;
    }
} 