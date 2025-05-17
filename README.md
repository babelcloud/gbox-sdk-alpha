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

## 开发

```bash
# 开发模式（监视文件变化）
npm run dev

# 构建
npm run build

# 类型检查
npm run typecheck
```

## 许可证

ISC 