# GBox SDK

GBox SDK 是一个用于与 GBox 服务交互的 TypeScript/JavaScript 客户端库。

## 安装

```bash
npm install gbox-sdk
```

## 使用方法

### ESM 导入

```typescript
import { GboxClient } from "gbox-sdk";

async function main() {
  const gbox = new GboxClient({
    apiKey: 'gbox_1234567890',
  });

  const android = await gbox.initAndroid();
  await android.click(100, 100);
}

main();
```

### CommonJS 导入

```javascript
const { GboxClient } = require("gbox-sdk");

async function main() {
  const gbox = new GboxClient({
    apiKey: 'gbox_1234567890',
  });

  const android = await gbox.initAndroid();
  await android.click(100, 100);
}

main();
```

## 功能

- Android 沙箱环境
  - 截图
  - 点击
  - 滚动
  - 按键操作
  - 获取设备屏幕尺寸

## API 参考

### GboxClient

`GboxClient` 是与 GBox 服务交互的主要客户端类。

#### 构造函数

```typescript
new GboxClient(options?: GboxClientOptions)
```

**参数:**
- `options` (可选): 配置对象
  - `apiKey`: API 密钥，如果未提供则从环境变量 `GBOX_API_KEY` 获取
  - `baseUrl`: 自定义 API 基础 URL，默认为 'https://gboxes.app'

#### 方法

##### initAndroid()

初始化 Android 沙箱环境。

```typescript
async initAndroid(): Promise<AndroidGbox>
```

**返回值:** 返回 `AndroidGbox` 实例，用于与 Android 沙箱交互。

### AndroidGbox

`AndroidGbox` 提供与 Android 沙箱环境交互的方法。

#### 方法

##### screenshot()

获取当前 Android 屏幕截图。

```typescript
async screenshot(): Promise<string>
```

**返回值:** 返回截图的 base64 编码字符串。

##### click(x, y)

在指定坐标位置模拟点击操作。

```typescript
async click(x: number, y: number): Promise<AndroidResponse>
```

**参数:**
- `x`: 点击操作的 X 坐标（横坐标）
- `y`: 点击操作的 Y 坐标（纵坐标）

**返回值:** 返回操作结果对象。

##### scroll(start, end)

模拟从起始点到终点的滚动操作。

```typescript
async scroll(start: [number, number], end: [number, number]): Promise<AndroidResponse>
```

**参数:**
- `start`: 起始点坐标 `[x, y]`
- `end`: 终点坐标 `[x, y]`

**返回值:** 返回操作结果对象。

##### keypress(key)

模拟按键操作。

```typescript
async keypress(key: string): Promise<AndroidResponse>
```

**参数:**
- `key`: 要模拟的按键名称

**返回值:** 返回操作结果对象。

##### getDeviceScreenSize()

获取设备屏幕尺寸。

```typescript
async getDeviceScreenSize(): Promise<[number, number]>
```

**返回值:** 返回设备屏幕尺寸。

## 开发

```bash
# 开发模式（监视文件变化）
npm run dev

# 构建
npm run build

# 类型检查
npm run typecheck
```
