import { GboxClient } from './dist/index.js';
import fs from 'fs';

async function main() {
  const gbox = new GboxClient({
    apiKey: 'gbox-tQ7rug19StcoEbEXTFMozTy1vhOS3nIUJdLupuLfkbyixvzPeB',
  });

  const android = await gbox.initAndroid("2538dc64-1023-4dc1-a226-38db75ad4650");

  // await android.click(319, 795);

  // await android.scroll([300, 300], [100, 300]);

  await android.keypress('abc');

  // 等待10秒
  await new Promise(resolve => setTimeout(resolve, 5000));

  const screenshot = await android.screenshot();

  console.log(screenshot);

  // 保存截图到本地
  const base64Data = screenshot.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync('screenshot.png', buffer);
  console.log('截图已保存为 screenshot.png');

    // const size = await android.getDeviceScreenSize();

  // console.log(size);
}

main();