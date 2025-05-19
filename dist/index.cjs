"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var index_exports = {};
__export(index_exports, {
  GboxClient: () => GboxClient
});
module.exports = __toCommonJS(index_exports);

// src/http.ts
var import_axios = __toESM(require("axios"), 1);
function getHttp(baseURL, apiKey) {
  const http = import_axios.default.create({
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
  async getDeviceScreenSize() {
    const { data } = await this.http.post(`/api/v1/gbox/android/deviceScreenSize`, {
      uid: this.sandboxId
    });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GboxClient
});
//# sourceMappingURL=index.cjs.map