# GBox SDK

GBox SDK is a TypeScript/JavaScript client library for interacting with GBox services.

## Example
You can run the examples in the [example](https://github.com/h8r-dev/gbox-sdk/tree/main/example) directory.

## Installation

```bash
npm install gbox-sdk
```

## Usage

### ESM Import

```typescript
import { GboxClient } from "gbox-sdk";
import * as fs from 'fs';

// Or set env: export GBOX_API_KEY=xxx
const gbox = new GboxClient({
  apiKey: 'Your gbox api key',
});

// Initialize Android box (default lifecycle: 5 minutes, will be automatically released after 5 minutes)
const android = await gbox.initAndroid();
// Or you can use an existing simulator directly
//const android = await gbox.initAndroid("2f85cd9e-b314-45f3-ab13-5bcc57dacaf2")
console.log(android.sandboxId)

// Click at specified X Y position
await android.click(100, 100);

// Input content, limitation: only supports English input
// await android.type("hello");

// Keypress: support type: enter, delete, back, home, space
await android.keypress("enter");

// Swipe from start_x: 100, start_y: 200 to end_x: 200, end_y: 300, duration 300ms
await android.drag([500, 1000], [500, 400], 800);

// Returns screenshot as base64 encoded string
const screenshot = await android.screenshot();

// You can save screenshot as PNG file
const base64Data = screenshot.replace(/^data:image\/png;base64,/, '');
fs.writeFileSync('screenshot.png', base64Data, 'base64');

// Get screen dimensions, returns width*height
const screenSize = await android.getDeviceScreenSize()
console.log(screenSize)

```

### CommonJS Import

```javascript
const { GboxClient } = require("gbox-sdk");

const gbox = new GboxClient({
  apiKey: 'your api key',
});

const android = await gbox.initAndroid();
await android.click(100, 100);

```

## Features

- Android Sandbox Environment
  - Screenshot
  - Click
  - Scroll
  - Key Press Operations
  - Get Device Screen Dimensions

## API Reference

### GboxClient

`GboxClient` is the main client class for interacting with GBox services.

#### Constructor

```typescript
new GboxClient(options?: GboxClientOptions)
```

**Parameters:**
- `options` (optional): Configuration object
  - `apiKey`: API key, if not provided will be retrieved from environment variable `GBOX_API_KEY`
  - `baseUrl`: Custom API base URL, defaults to 'https://gboxes.app'

#### Methods

##### initAndroid()

Initialize the Android sandbox environment.

```typescript
async initAndroid(): Promise<AndroidGbox>
```

**Returns:** Returns an `AndroidGbox` instance for interacting with the Android sandbox.

### AndroidGbox

`AndroidGbox` provides methods for interacting with the Android sandbox environment.

#### Methods

##### screenshot()

Get the current Android screen screenshot.

```typescript
async screenshot(): Promise<string>
```

**Returns:** Returns the screenshot as a base64 encoded string.

##### click(x, y)

Simulate a click operation at the specified coordinates.

```typescript
async click(x: number, y: number): Promise<AndroidResponse>
```

**Parameters:**
- `x`: X coordinate (horizontal) for the click operation
- `y`: Y coordinate (vertical) for the click operation

**Returns:** Returns an operation result object.

##### scroll(start, end)

Simulate a scroll operation from start point to end point.

```typescript
async scroll(start: [number, number], end: [number, number]): Promise<AndroidResponse>
```

**Parameters:**
- `start`: Starting point coordinates `[x, y]`
- `end`: End point coordinates `[x, y]`

**Returns:** Returns an operation result object.

##### keypress(key)

Simulate a key press operation.

```typescript
async keypress(key: string): Promise<AndroidResponse>
```

**Parameters:**
- `key`: Name of the key to simulate

**Returns:** Returns an operation result object.

##### drag(options)

Simulate a drag operation from start point to end point with specified duration.

```typescript
async drag(options: { start: [number, number], end: [number, number], duration: number }): Promise<AndroidResponse>
```

**Parameters:**
- `options`: Configuration object
  - `start`: Starting point coordinates `[x, y]`
  - `end`: End point coordinates `[x, y]`
  - `duration`: Duration of the drag operation in milliseconds

**Returns:** Returns an operation result object.

##### getDeviceScreenSize()

Get the device screen dimensions.

```typescript
async getDeviceScreenSize(): Promise<[number, number]>
```

**Returns:** Returns the device screen dimensions.

## Development

```bash
# Development mode (watch file changes)
npm run dev

# Build
npm run build

# Type checking
npm run typecheck
```
