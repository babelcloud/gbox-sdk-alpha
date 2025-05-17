// src/http.ts
import axios from "axios";
function getHttp(baseURL, apiKey) {
  const http = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    }
  });
  return http;
}
var http_default = getHttp;

// src/android.ts
var AndroidGbox = class {
  constructor(http) {
    this.http = http;
    this.sandboxId = null;
    const init = async () => {
      const { data } = await this.http.post("/api/v1/android/start");
      this.sandboxId = data.sandboxId;
      return this;
    };
    return init();
  }
  async screenshot() {
    const { data } = await this.http.post(`/api/v1/android/screenshot/${this.sandboxId}`);
    return data.screenshot;
  }
  async click(x, y) {
    const { data } = await this.http.post(`/api/v1/android/click/${this.sandboxId}`, { x, y });
    return data;
  }
  async scroll(start, end) {
    const [start_x, start_y] = start;
    const [end_x, end_y] = end;
    const { data } = await this.http.post(`/api/v1/android/scroll/${this.sandboxId}`, { start_x, start_y, end_x, end_y });
    return data;
  }
  async keypress(key) {
    const { data } = await this.http.post(`/api/v1/android/keypress/${this.sandboxId}`, { key });
    return data;
  }
};

// index.ts
var defaultBaseUrl = "https://gboxes.app";
var defaultApiKey = process.env.GBOX_API_KEY;
var envBaseUrl = process.env.GBOX_BASE_URL;
var GboxClient = class {
  constructor(options = {}) {
    this.androidSandboxId = null;
    const key = options.apiKey || defaultApiKey;
    if (!key) {
      throw new Error("GBOX_API_KEY is not set on environment variables");
    }
    const baseUrlValue = options.baseUrl || envBaseUrl || defaultBaseUrl;
    this.http = http_default(baseUrlValue, key);
  }
  async initAndroid() {
    const android = await new AndroidGbox(this.http);
    return android;
  }
};
var gbox = new GboxClient();
export {
  GboxClient as default,
  gbox
};
//# sourceMappingURL=index.js.map