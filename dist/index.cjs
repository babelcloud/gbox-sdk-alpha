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
  async initAndroid() {
    const android = await new AndroidGbox(this.http);
    return android;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GboxClient
});
//# sourceMappingURL=index.cjs.map