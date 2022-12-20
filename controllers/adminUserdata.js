import UserData from "../modles/userData.js";
import { fileToBase64 } from "./fileToBase64.js";

const getListUserData = async (req,res)=>{

    try {

        const init = req.body.num;
       
        const [[ { 'COUNT(id)': count } ],_] = await UserData.numOfUserData()
        const dif = count - init;//20 10 0 //21 
        if(dif>=10){
            
            const [userDataList,_] = await UserData.findByLimit(init,10);
            let reUserdata = userDataList;
            for(let i = 0;i<10 ;i++){
                const base64 = await fileToBase64(reUserdata[i].e_mail);
                reUserdata[i].profilePicture = base64;
            }
            return res.status(200).json({"userData":reUserdata});
        }
        if(dif<0) return res.status(200).json({"userData":[]});
        
        
        const [userDataList,__] = await UserData.findByLimit(init,dif);
        let reUserdata = userDataList
        for(let i = 0; i<dif;i++){
            const base64 = await fileToBase64(reUserdata[i].e_mail);
            reUserdata[i].profilePicture = base64;
        }
        return res.status(200).json({"userData":reUserdata});

        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"});

    }




}



const queryUserData = async (req,res) =>{
    try {
        console.log(req.body);
        const keyword = req.body.keyword;
        const [userData,_] = await UserData.findByKeyword(keyword);
        let reUserdata = userData;
        for(let i in reUserdata){
            const base64 = await fileToBase64(reUserdata[i].e_mail);
            reUserdata[i].profilePicture = base64;
        }  
        return res.status(200).json({"queryResults":reUserdata});

    } catch (err) {

        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }


}

const changedServiceStatus = async (req,res)=>{
    try {
        const {e_mail,servicestatus} = req.body;
        const [[{name}],_] = await UserData.findAllByEmail(e_mail)
        await UserData.changedServiceStatus(e_mail,servicestatus);
        return res.status(200).json({"servicestatus":servicestatus});
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }



}

export default{
    getListUserData,
    queryUserData,
    changedServiceStatus
}
