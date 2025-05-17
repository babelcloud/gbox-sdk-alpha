


export default class AndroidGbox {
    constructor(http) {
        this.http = http;
        this.sandboxId = null;


        async function init() {
            const {sandboxId} = await this.http.post('/api/v1/android/start');
            this.sandboxId = sandboxId;
        }

        return init();
    }

    async screenshot() {
        const {screenshot} = await this.http.post(`/api/v1/android/screenshot/${this.sandboxId}`);
        return screenshot;
    }

    async click(x, y) {
        const response = await this.http.post(`/api/v1/android/click/${this.sandboxId}`, {x, y});
        return response;
    }

    async scroll([start_x, start_y],[end_x, end_y]) {
        const response = await this.http.post(`/api/v1/android/scroll/${this.sandboxId}`, {start_x, start_y, end_x, end_y});
        return response;
    }

     async keypress(key) {
        const response = await this.http.post(`/api/v1/android/keypress/${this.sandboxId}`, {key});
        return response;
    }
}
