import UserData from "../modles/userData.js";
import mail from "../config/mail.js"
import random from "../lib/random.js"
import WhiteSheet from "../modles/whiteSheet.js"
import { reTest } from "../lib/regularExpression.js";
import utils from "../lib/PSutils.js";
import frontRouterData from "../lib/frontRouterData.js";
import passport from "../config/passport.js";

let  verifyVCode = {}

const sendEmail = async(req,res)=>{
    try {
        console.log(req.body);

        const email  = req.body[0].e_mail;
        const test  = reTest("email",email);
        if(!test) return res.status(200).json({"message":"emailTypeError"});
        const [[allowed],_] = await WhiteSheet.findAllowedByEmail(email);
        const [[user],__] = await UserData.findByEmail(email)
        if (!allowed) return res.status(200).json({"message":"NotWhiteSheet"});
        if (user) return res.status(200).json({"message":"registered"});
        const verify = random.randomNumStr(5);
        const mailRes  = await mail.sendMail(email,verify)
        console.log(mailRes);
        verifyVCode[email] = verify;
        res.status(200).json({"message":"VerifiedEmailWasSent"})
    } catch (err) {
        
        console.log(err);
        res.status(405).json({"message":"err"})
        
    }

}


const register = async (req,res)=>{

    try {
        console.log(req.body);

        const {name,password,e_mail,vCode,department} = req.body[0];
        const passwordTest = reTest("password",password)
        console.log(passwordTest);
        if (!passwordTest) return res.status(200).json({"message":"passwordTypeError"})
        if(verifyVCode[e_mail] === vCode){
            
            const {salt,hash} = utils.genPassword(password);
            const userData = new UserData(name,hash,salt,e_mail,department);
            await userData.saveUserData();
            delete verifyVCode[e_mail];
            return  res.status(200).json({"message":"registrationSussesful"})
        }

        res.status(200).json({"message":"verificationCodeError"})
        
    } catch (err) {
        console.log(err);
        res.status(405).json({"message":"err"})
        
    }


}
const login = (req,res,next)=>{

    passport.passport.authenticate('local', function(err, user) {
        if (err) { return res.status(200).json({"message":err}) }
        // Redirect if it fails
        if (!user) { return res.status(200).json({"message":"帳號或密碼錯誤"}); }
        req.logIn(user, function(err) {
          if (err) { return res.status(200).json({"message":err}) }
          // Redirect if it succeeds
          return next();
        });
      })(req, res, next);

}
const getFrontRouterData = (req,res)=>{
    let routerData = "";
    console.log(req.user);
    if(req.user.permission == 1 ) {
        routerData = frontRouterData.adminData;
        
        console.log(routerData);
        return res.status(200).json(routerData);
    }
    routerData = frontRouterData.memberData
    console.log(routerData);
 
    return res.status(200).json(routerData);


}
const logout = (req,res)=>{
    req.logOut((err)=>{if (err) { return console.log(err); }});
    req.session.destroy(()=>{
        return res.status(200).json({"message":"logout"});;
    });
}


export default{
    sendEmail,
    register,
    login,
    getFrontRouterData,
    logout
}