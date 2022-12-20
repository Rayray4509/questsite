import {Router} from "express";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const url = path.join(__dirname,"../dist") 


const router = Router();

router.get("/",(req,res,next)=>{
    res.sendFile(url+"/index.html")
}
);











export default{router}


