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
            const { data } = await this.http.post('/api/v1/android/start');
            this.sandboxId = data.sandboxId;
            return this;
        };

        return init() as unknown as AndroidGbox;
    }

    async screenshot(): Promise<string> {
        const { data } = await this.http.post(`/api/v1/android/screenshot/${this.sandboxId}`);
        return data.screenshot;
    }

    async click(x: number, y: number): Promise<AndroidResponse> {
        const { data } = await this.http.post(`/api/v1/android/click/${this.sandboxId}`, { x, y });
        return data;
    }

    async scroll(start: Point, end: Point): Promise<AndroidResponse> {
        const [start_x, start_y] = start;
        const [end_x, end_y] = end;
        const { data } = await this.http.post(`/api/v1/android/scroll/${this.sandboxId}`, { start_x, start_y, end_x, end_y });
        return data;
    }

    async keypress(key: string): Promise<AndroidResponse> {
        const { data } = await this.http.post(`/api/v1/android/keypress/${this.sandboxId}`, { key });
        return data;
    }
} 