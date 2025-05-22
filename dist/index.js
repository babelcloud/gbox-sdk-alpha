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
      const errorMessage = error.response ? `Request error: ${error.response.status} ${error.response.statusText} - ${JSON.stringify(error.response.data)}` : error.request ? "Request sent but no response received" : `Request configuration error: ${error.message}`;
      console.error("HTTP error:", errorMessage);
      return Promise.reject(errorMessage);
    }
  );
  return http;
}
var http_default = getHttp;

// src/type.ts
var Language = /* @__PURE__ */ ((Language2) => {
  Language2["PYTHON"] = "python";
  Language2["JAVASCRIPT"] = "javascript";
  return Language2;
})(Language || {});
var Architecture = /* @__PURE__ */ ((Architecture2) => {
  Architecture2["ARM64"] = "arm64";
  Architecture2["X86"] = "x86";
  return Architecture2;
})(Architecture || {});

// src/android.ts
var AndroidGbox = class {
  constructor(http, boxId, arch) {
    this.http = http;
    this.sandboxId = boxId || null;
    if (arch) {
      if (Object.values(Architecture).includes(arch)) {
        this.arch = arch;
      } else {
        throw new Error(`Invalid architecture type: ${arch}. Should be one of the values in the Architecture enum.`);
      }
    } else {
      this.arch = "arm64" /* ARM64 */;
    }
    const init = async () => {
      if (boxId) {
        this.sandboxId = boxId;
        return this;
      } else {
        const { data } = await this.http.post("/api/v1/gbox/android/create", {
          arch: this.arch
        });
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

// src/terminal.ts
var TerminalGbox = class {
  constructor(http, boxId) {
    this.http = http;
    this.sandboxId = boxId || null;
    const init = async () => {
      if (boxId) {
        this.sandboxId = boxId;
        return this;
      } else {
        const { data } = await this.http.post("/api/v1/gbox/terminal/create");
        this.sandboxId = data.uid;
        return this;
      }
    };
    return init();
  }
  async runCode(code, language) {
    if (!language) {
      language = "python" /* PYTHON */;
    }
    if ("python" /* PYTHON */ !== language && "javascript" /* JAVASCRIPT */ !== language) {
      throw new Error("Invalid language");
    }
    const { data } = await this.http.post("/api/v1/gbox/terminal/runCode", {
      uid: this.sandboxId,
      code,
      language
    });
    return data.stdout;
  }
  async runCommand(command) {
    const { data } = await this.http.post("/api/v1/gbox/terminal/run", {
      uid: this.sandboxId,
      command
    });
    return data.stdout;
  }
};

// src/client.ts
var defaultBaseUrl = "https://alpha.gbox.cloud";
var GboxClient = class {
  constructor(options = {}) {
    const defaultApiKey = process.env.GBOX_API_KEY;
    const envBaseUrl = process.env.GBOX_BASE_URL;
    const key = options.apiKey || defaultApiKey;
    if (!key) {
      throw new Error("GBOX_API_KEY is not set on environment variables");
    }
    const baseUrlValue = options.baseUrl || envBaseUrl || defaultBaseUrl;
    this.http = http_default(baseUrlValue, key);
  }
  async initAndroid(options) {
    const { boxId, arch } = options || {};
    const android = await new AndroidGbox(this.http, boxId, arch);
    return android;
  }
  async initTerminal(options) {
    const { boxId } = options || {};
    const terminal = await new TerminalGbox(this.http, boxId);
    return terminal;
  }
};
export {
  Architecture,
  GboxClient,
  Language
};
//# sourceMappingURL=index.js.map