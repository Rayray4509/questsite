import WhiteSheet from "../modles/whiteSheet.js";
import { reTest } from "../lib/regularExpression.js";


const addWhiteSheet = async (req,res)=>{
    try {
        const email = req.body.e_mail;
        const test  = reTest("email",email);
        if(!test) return res.status(200).json({"message":"emailTypeError"});
        const [[isWhiteSheet],_] = await WhiteSheet.findIsallowedByEmail(email);
        if (isWhiteSheet){

            if(isWhiteSheet.isallowed == 1) return res.status(200).json({"message":"whiteSheetExist"});
            if(isWhiteSheet.isallowed == 0){
                await WhiteSheet.updateIsallowed(1,email);
                return res.status(200).json({"message":`${email}新增成功`});
            }
        }
        const whiteSheet = new WhiteSheet(email);
        await whiteSheet.saveWhiteSheet();
        return res.status(200).json({"message":`${email}新增成功`})
        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"})
        
    }

}
const getListWhiteSheet = async (req,res) =>{
    try {

        const init = req.body.num;
       
        const [[ { 'COUNT(id)': count } ],_] = await WhiteSheet.numOfWhiteSheet();
        const dif = count - init;//20 10 0 //21 
        if(dif>=10){
           
            const [whiteSheetList,_] = await WhiteSheet.findEmailByLimit(init,10)
            console.log(whiteSheetList.length);
            return res.status(200).json({"whiteSheet":whiteSheetList})
        }
        if(dif<0) return res.status(200).json({"whiteSheet":[]})
    
        const [whiteSheetList,__] = await WhiteSheet.findEmailByLimit(init,dif)
        return res.status(200).json({"whiteSheet":whiteSheetList})

        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"})

    }

}
const queryWhiteSheet = async (req,res)=>{

    try {
        console.log(req.body);
        const keyword = req.body.e_mail;
        const [queryResults,_] = await WhiteSheet.findEmailByKeyword(keyword);
        return res.status(200).json({"queryResults":queryResults})
        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"})
        
    }


}
const delWhiteSheet = async (req,res)=>{
    try {
      
        const email = req.body.e_mail;
        await WhiteSheet.updateIsallowed(0,email);
        return res.status(200).json({"message":`${email}刪除成功`});
     
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"})
        
    }

    
}







export default {
    addWhiteSheet,
    getListWhiteSheet,
    queryWhiteSheet,
    delWhiteSheet
}