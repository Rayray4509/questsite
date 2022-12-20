import UserData from "../modles/userData.js";
import Quest from "../modles/quest.js";
import Comment from "../modles/comment.js";
import { fileToBase64 } from "./fileToBase64.js";
import random from "../lib/random.js";
import mail from "../config/mail.js";
import PSutils from "../lib/PSutils.js";
import { reTest } from "../lib/regularExpression.js";


const form = [
    {
      "title": "信箱",
      "info": "user@email.com.tw",//使用者帳號
      "isCompleted": "false"
    },
    {
      "title": "姓名",
      "info": "user",//使用者姓名
      "isCompleted": "false"
    },
    {
      "title": "部門",
      "info": "設計部",//使用者部門
      "isCompleted": "false"
    },
    {              
        "title": "密碼",
        "info": "****"
    },  
   
  ]



const getPersonalData = async(req,res)=>{
    try {
        let reForm = form;
        reForm[0].info = req.user.e_mail;
        reForm[1].info = req.user.name;
        reForm[2].info = req.user.department;
      
        return res.status(200).json({"modify":reForm});
        
    } catch (err) {

        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }
    

}

const getProfilePicture = async (req,res)=>{
    try {

        const base64 = await fileToBase64(req.user.e_mail);
        return res.status(200).json({"profilePicture":base64});
        
    } catch (err) {

        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }

}
const updataPersonalData = async (req,res) =>{
    try {
        console.log(req.body);

        const name = req.body[1].info;
        const department = req.body[2].info;
        const email = req.user.e_mail;
        console.log(name,department,email);
        await UserData.updateUserData(name,department,email);
        return res.status(200).json({"message":"success"});
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }
}
const personalListQuest = async (req,res) =>{
    try {
        const e_mail = req.user.e_mail;
        const init = req.body.article;
       
        const [[ { 'COUNT(id)': count } ],_] = await Quest.numOfPersonalQuest(e_mail);
        const dif = count - init;//20 10 0 //21 
        if(dif>=10){
            
            const [qusetList,_] = await Quest.findByEmailLimit(init,10,e_mail);
            let requsetList = qusetList;
            for(let i = 0;i<10 ;i++){
                const base64 = await fileToBase64(requsetList[i].author);
                const [[{name}],_] = await UserData.findAllByEmail(requsetList[i].author)
                const [comments,__] = await Comment.findByQustId(requsetList[i].id)
                requsetList[i].profilePicture = base64;
                requsetList[i].author = name;
                requsetList[i].messageNum = comments.length;

            }
            return res.status(200).json({"questData":requsetList});
        }
        if(dif<0) return res.status(200).json({"questData":[]});
        
        
        const [qusetList,__] = await Quest.findByEmailLimit(init,dif,e_mail);
            let requsetList = qusetList;
        for(let i = 0; i<dif;i++){
            const base64 = await fileToBase64(requsetList[i].author);
                const [[{name}],_] = await UserData.findAllByEmail(requsetList[i].author)
                const [comments,__] = await Comment.findByQustId(requsetList[i].id)
                requsetList[i].profilePicture = base64;
                requsetList[i].author = name;
                requsetList[i].messageNum = comments.length;
        }
        return res.status(200).json({"questData":requsetList});

        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"});

    }
    

} 

const updateQuestById = async (req,res)=>{
    try {
        console.log(req.body);
        const id = req.body.id;
        const content = req.body.content;
        await Quest.updateQuestById(content,id);
        return res.status(200).json({"message":"success"});
        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }
}

const changePassword = async (req,res)=>{
    try {
        console.log(req.body);
        const {oldPassword} = req.body;
        const {newPassword} = req.body;
        const test = reTest("password",newPassword)
        if(test == false)return res.status(200).json({"message":"passwordTypeError"});
        const isValid = PSutils.validPassword(oldPassword,req.user.hash,req.user.salt);
        if(isValid){
            const {salt,hash} = PSutils.genPassword(newPassword);
            await UserData.updatePassword(hash,salt,req.user.e_mail);
            return res.status(200).json({"message":"success"});
        }
        return res.status(200).json({"message":"passwordError"});
        
        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }
}

const forgotPassword = async (req,res)=>{
    try {
        console.log(req.body);
        const e_mail = req.body[0].e_mail;
        const [[isEmail],_] = await UserData.findByEmail(e_mail)
        if(isEmail){
            console.log(123);
            const newPassword = random.randomPassword(5);
            const {salt,hash} = PSutils.genPassword(newPassword);
            await mail.sendPassword(e_mail,newPassword)
            await UserData.updatePassword(hash,salt,e_mail);
            return res.status(200).json({"message":"newPasswordWasSent"});
        }
        return res.status(200).json({"message":"accountNotExist"});
        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }
    
}



export default{
    getPersonalData,
    getProfilePicture,
    updataPersonalData,
    personalListQuest,
    updateQuestById,
    changePassword,
    forgotPassword
}