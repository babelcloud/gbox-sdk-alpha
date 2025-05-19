import { GboxClient } from './dist/index.js';

async function main() {
  const gbox = new GboxClient({
    apiKey: 'gbox-tQ7rug19StcoEbEXTFMozTy1vhOS3nIUJdLupuLfkbyixvzPeB',
  });

  const android = await gbox.initAndroid('1cf65c4e-3092-4b6f-835e-30066e989bb4');

  // await android.click(100, 100);

  // await android.scroll([100, 100], [200, 200]);

  // await android.keypress('a');

  const size = await android.getDeviceScreenSize();

  console.log(size);

  // const screenshot = await android.screenshot();

  // console.log(screenshot);
}

main();