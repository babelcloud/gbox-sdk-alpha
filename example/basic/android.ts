import { GboxClient } from "gbox-sdk";
import * as fs from 'fs';

const gbox = new GboxClient();

// Initialize Android box (default lifecycle: 5 minutes, will be automatically released after 5 minutes)
const android = await gbox.initAndroid();
// Or you can use an existing simulator directly
//const android = await gbox.initAndroid("dfe314f1-8a18-40d6-b444-5b329f1cb138")
console.log(android.sandboxId)

// Click at specified X Y position
await android.click(100, 100);

// Input content, limitation: only supports English input
await android.keypress("hello");

// Returns screenshot as base64 encoded string
const screenshot = await android.screenshot();

// You can save screenshot as PNG file
const base64Data = screenshot.replace(/^data:image\/png;base64,/, '');
fs.writeFileSync('screenshot.png', base64Data, 'base64');

// Swipe from start_x: 100, start_y: 200 to end_x: 200, end_y: 300, duration 300ms
// await android.drag({ start: [100, 200], end: [200, 300], duration: 300 });

// Get screen dimensions, returns width*height
// const screenSize = await android.getDeviceScreenSize()
// console.log(screenSize)