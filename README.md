# GBox SDK

GBox SDK 是一个用于与 GBox 服务交互的 TypeScript/JavaScript 客户端库。

## 安装

```bash
npm install gbox-sdk
```

## 使用方法

### ESM 导入

```typescript
import GboxClient, { gbox } from 'gbox-sdk';

// 使用默认实例
async function main() {
  const android = await gbox.initAndroid();
  const screenshot = await android.screenshot();
  console.log(screenshot);
}

// 或者创建自定义实例
const customClient = new GboxClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://your-gbox-instance.com'
});
```

### CommonJS 导入

```javascript
const { default: GboxClient, gbox } = require('gbox-sdk');

// 使用默认实例
async function main() {
  const android = await gbox.initAndroid();
  const screenshot = await android.screenshot();
  console.log(screenshot);
}
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