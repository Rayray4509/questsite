import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const url = path.join(__dirname,"../image") 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file,"儲存");
      cb(null, url)
    },
    filename: function (req, file, cb) {
       
      cb(null, "test"+file.originalname )
    }
  })
  const upload = multer({
    storage:storage,
    limits: { fileSize:  85555555 },
    fileFilter : (req, file, cb)=>{
        console.log(file);
        //console.log("過濾器");
        // 只接受三種圖片格式
        
        const fileSize = parseInt(req.headers["content-length"])
        console.log(file);
        // console.log(fileSize);
        if (fileSize>1048576) {
          console.log("有近來");
          req.fileSizeError = "file Size too large";
          return cb(null, false, req.fileSizeError);
        }
        //  // return cb(new Error('太大了'),false);
          
        // }
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
            return cb(null, true);
        }
        //console.log("拋出錯誤");
        
        //return cb(new Error('only png, jpg, jpeg allow to uploaded'));
        req.fileTypeError = "only png, jpg, jpeg allow to uploaded";
        return cb(null, false, req.fileTypeError);
      }
}).single("image")

const uploadImg = (req,res)=>{

  
        upload(req, res, (err)=>{
          if (req.fileSizeError){
            console.log(req.fileSizeError);
            return res.status(406).json({"message":req.fileSizeError})
          }
          if (req.fileTypeError){
            console.log(fileTypeError);
            return res.status(406).json({"message":req.fileTypeError})
          }
            if (err instanceof multer.MulterError) {
                return res.status(406).json({"message":err.message})
                // A Multer error occurred when uploading.
            } 
             if (err) {
              return res.status(406).json({"message":err.message})
                // An unknown error occurred when uploading.
            }
            
            // Everything went fine. 
            return res.status(200).json({"message":"success"})
    
        })
        
  
}

export default{
    uploadImg
}


  