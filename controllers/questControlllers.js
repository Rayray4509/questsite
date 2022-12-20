import Quest from "../modles/quest.js";
import UserData from "../modles/userData.js";
import Comment from "../modles/comment.js";
import { fileToBase64 } from "./fileToBase64.js";



const getListQuest = async (req,res)=>{
    console.log(req.user);
    console.log(req.session);

    try {

        const init = req.body.article;
        console.log(init);
       
        const [[ { 'COUNT(id)': count } ],_] = await Quest.numOfQuest()
        const dif = count - init;//20 10 0 //21 
        if(dif>=10){
            
            const [qusetList,_] = await Quest.findByLimit(init,10);
            let requsetList = qusetList;
            for(let i = 0;i<10 ;i++){
                const base64 = await fileToBase64(requsetList[i].author);
                const [[data],_] = await UserData.findAllByEmail(requsetList[i].author)
                const [comments,__] = await Comment.findByQustId(requsetList[i].id)
                console.log(data);
                requsetList[i].profilePicture = base64;
                requsetList[i].author = data.name;
                requsetList[i].messageNum = comments.length;
                requsetList[i].department = data.department;

            }
            return res.status(200).json({"questData":requsetList});
        }
        if(dif<0) {
            console.log(init);
            return res.status(200).json({"questData":[]});}
        
        
        const [qusetList,__] = await Quest.findByLimit(init,dif);
        console.log(init,"小於10篇");
            let requsetList = qusetList;
        for(let i = 0; i<dif;i++){
            const base64 = await fileToBase64(requsetList[i].author);
                const [[data],_] = await UserData.findAllByEmail(requsetList[i].author)
                const [comments,__] = await Comment.findByQustId(requsetList[i].id)
                requsetList[i].profilePicture = base64;
                requsetList[i].author = data.name;
                requsetList[i].messageNum = comments.length;
                requsetList[i].department = data.department;
        }
        
        return res.status(200).json({"questData":requsetList});

        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"});

    }

}


const getQuestByid = async (req,res) =>{
    try {

        const id = req.body.id;
        const [[questData],_] = await Quest.findById(id);
        let requestData = questData;
        const base64 = await fileToBase64(requestData.author);
        const [[data],__] = await UserData.findAllByEmail(requestData.author)
        const [comments,___] = await Comment.findByQustId(requestData.id)
        requestData.profilePicture = base64;
        requestData.author = data.name;
        requestData.department = data.department;

        let reComment = comments
        for(let i in comments){
            const [[data],__] = await UserData.findAllByEmail(comments[i].author)
            const base64 = await fileToBase64(comments[i].author);
            reComment[i].author = data.name;
            reComment[i].profilePicture = base64;
            reComment[i].department = data.department;
        }
        requestData.message = reComment;

        return res.status(200).json({"questData":requestData});

    } catch (err) {

        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }


}
const postNewQuest = async (req,res)=>{
    try {

        const email = req.user.e_mail;
        const {title,text} = req.body;
        const quest = new Quest(title,text,email);
        await quest.saveQuest();
        return res.status(200).json({"message":"postSussesful"});
        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }
    

}
const queryQuest = async (req,res) =>{
    try {
        

        const keyword = req.body.keyword;
        const [questList,_] = await Quest.findByKeyword(keyword);
        let requsetList = questList;
        for(let i = 0; i<questList.length;i++){
            const base64 = await fileToBase64(requsetList[i].author);
            const [[data],_] = await UserData.findAllByEmail(requsetList[i].author)
            const [comments,__] = await Comment.findByQustId(requsetList[i].id)
            requsetList[i].profilePicture = base64;
            requsetList[i].author = data.name;
            requsetList[i].messageNum = comments.length;
            requsetList[i].department = data.department;
        }
        return res.status(200).json({"questData":requsetList});



        
    } catch (err) {
        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }
}
const newComment = async (req,res)=>{
    try {
        console.log(req.body);

        const {content,questId} =req.body;
        const email = req.user.e_mail;
        const comment = new Comment(questId,email,content);
        await comment.saveComment();
        return res.status(200).json({"message":content});
        
    } catch (err) {

        console.log(err);
        return res.status(405).json({"message":"err"});

        
    }
    


}
const delQuest =  async (req,res)=>{
    try {
        const id = req.body.id;
        await Quest.delQuest(id);
        return res.status(200).json({"message":"delSussesful"});

        
    } catch (err) {

        console.log(err);
        return res.status(405).json({"message":"err"});
        
    }

}




export default{
    getListQuest,
    getQuestByid,
    postNewQuest,
    newComment,
    queryQuest,
    delQuest
}