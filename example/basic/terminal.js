import { GboxClient, Language } from "gbox-sdk";
import dotenv from 'dotenv';
dotenv.config();
const gbox = new GboxClient();
const terminal = await gbox.initTerminal();
// Install requests package
const installRes = await terminal.runCommand("pip install requests");
console.log("Install result:", installRes);
const pythonScript = `
import requests

def print_gbox():
    print("Welcome to Gbox Cloud!")
    
    response = requests.get("https://alpha.gbox.cloud/")
    print(response.text.split("<title>")[1].split("</title>")[0])

print_gbox()
`;
const runCodeRes = await terminal.runCode(pythonScript, Language.PYTHON);
console.log(runCodeRes);
