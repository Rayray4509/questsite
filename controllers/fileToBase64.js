import fs from "fs/promises"
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exists = async filePath => await fs.access(filePath).then(() => true).catch(() => false);
 
const fileToBase64 = async (email) =>{
    
    const url = path.join(__dirname,`../image/${email}.png`)
    const isExists = await exists(url)
   
    if (isExists) {
        const base64 = await fs.readFile(url, {encoding: 'base64'});
        return base64;
    }
    const preSetUrl = path.join(__dirname,`../image/preset/iconmonstr-user-5-240.png`)
    const PreSetBase64 = await fs.readFile(preSetUrl, {encoding: 'base64'});
    return PreSetBase64;
        
}

export{fileToBase64}

