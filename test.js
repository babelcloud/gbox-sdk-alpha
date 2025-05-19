import { GboxClient } from "./dist/index.js";
import fs from 'fs';


async function main() {
  const gbox = new GboxClient({
    apiKey: "gbox-HLz6wWS1CzuIeS6rEJHtAtyzDNDIUPBB2A2k0Yzo8NpRNcRgvk"
  });

  const android = await gbox.initAndroid("c2360e3e-052e-4b86-ac32-b38c18f3eba9");

  // 等待3s
  await new Promise(resolve => setTimeout(resolve, 3000));

  await android.click(500, 2760);

  await android.type('123');

  await android.keypress('enter');

  const screenSize = await android.getDeviceScreenSize();

  console.log(screenSize);

  // 等待3s
  await new Promise(resolve => setTimeout(resolve, 3000));

  const screenshot = await android.screenshot();

  const base64Data = screenshot.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync('screenshot.png', buffer);
  console.log('截图已保存为 screenshot.png');

}
// main();

async function testTerminal() {
  const gbox = new GboxClient({
    apiKey: "gbox-HLz6wWS1CzuIeS6rEJHtAtyzDNDIUPBB2A2k0Yzo8NpRNcRgvk"
  });
  const terminal = await gbox.initTerminal();
  
  const result = await terminal.runCode("print('Hello, World!')", );
  
  console.log(result);

  const result2 = await terminal.runCommand("ls");

  console.log(result2);
}

testTerminal()