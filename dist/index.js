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
  http.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMessage = error.response ? `\u8BF7\u6C42\u9519\u8BEF: ${error.response.status} ${error.response.statusText} - ${JSON.stringify(error.response.data)}` : error.request ? "\u8BF7\u6C42\u5DF2\u53D1\u9001\u4F46\u672A\u6536\u5230\u54CD\u5E94" : `\u8BF7\u6C42\u914D\u7F6E\u9519\u8BEF: ${error.message}`;
      console.error("HTTP\u9519\u8BEF:", errorMessage);
      return Promise.reject(errorMessage);
    }
  );
  return http;
}
var http_default = getHttp;

// src/android.ts
var AndroidGbox = class {
  constructor(http, boxId) {
    this.http = http;
    this.sandboxId = boxId || null;
    const init = async () => {
      if (boxId) {
        this.sandboxId = boxId;
        return this;
      } else {
        const { data } = await this.http.post("/api/v1/gbox/android/create");
        this.sandboxId = data.uid;
        return this;
      }
    };
    return init();
  }
  async screenshot() {
    const { data } = await this.http.post(`/api/v1/gbox/android/screenshot`, {
      uid: this.sandboxId
    });
    return data.url;
  }
  async click(x, y) {
    const { data } = await this.http.post(`/api/v1/gbox/android/click`, {
      x,
      y,
      uid: this.sandboxId
    });
    return data;
  }
  async scroll(start, end) {
    const [startX, startY] = start;
    const [endX, endY] = end;
    const { data } = await this.http.post(`/api/v1/gbox/android/scroll`, { startX, startY, endX, endY, uid: this.sandboxId });
    return data;
  }
  async keypress(key) {
    const { data } = await this.http.post(`/api/v1/gbox/android/keyPress`, {
      key,
      uid: this.sandboxId
    });
    return data;
  }
  async type(text) {
    const { data } = await this.http.post(`/api/v1/gbox/android/type`, {
      text,
      uid: this.sandboxId
    });
    return data;
  }
  async getDeviceScreenSize() {
    const { data } = await this.http.post(`/api/v1/gbox/android/deviceScreenSize`, {
      uid: this.sandboxId
    });
    return data;
  }
  async drag(start, end, duration) {
    const [startX, startY] = start;
    const [endX, endY] = end;
    const { data } = await this.http.post(`/api/v1/gbox/android/drag`, { startX, startY, endX, endY, ms: duration, uid: this.sandboxId });
    return data;
  }
};

// src/client.ts
var defaultBaseUrl = "https://gboxes.app";
var defaultApiKey = process.env.GBOX_API_KEY;
var envBaseUrl = process.env.GBOX_BASE_URL;
var GboxClient = class {
  constructor(options = {}) {
    const key = options.apiKey || defaultApiKey;
    if (!key) {
      throw new Error("GBOX_API_KEY is not set on environment variables");
    }
    const baseUrlValue = options.baseUrl || envBaseUrl || defaultBaseUrl;
    this.http = http_default(baseUrlValue, key);
  }
  async initAndroid(boxId) {
    const android = await new AndroidGbox(this.http, boxId);
    return android;
  }
};
export {
  GboxClient
};
//# sourceMappingURL=index.js.map