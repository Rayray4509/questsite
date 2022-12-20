import passport from "passport";
import UserData from "./../modles/userData.js"
import passportLocal from "passport-local"
import utils from "../lib/PSutils.js";


const custumFields = {
    usernameField: "userName",
    passwordField: "password"
}

const verifyCallback = (username,password,done)=>{
    console.log("verifyCallback");
    

    UserData.findAllByEmailLogin(username)
        .then(res=>{
            
            const [[user],_] = res
            
            if(!user) return done(null,false);
      
            const isValid = utils.validPassword(password,user.hash,user.salt);
            console.log(isValid);
            if (isValid){
                
                return done(null,user);
            }else{
                return done(null,false);
            }

        })
        .catch((err)=>{
            console.log(err);
            done(err)
        });



}
const strategy = new passportLocal.Strategy(custumFields,verifyCallback);

passport.use(strategy)





passport.serializeUser(function(user, done) {
    console.log("serializeUser");
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    console.log("deserializeUser");
    
    UserData.findById(id)
    .then(res => {
        const [[user],_] = res
        console.log(user);
        
        done(null, user);
    }) 
    .catch(err=>{
        done(err);
    })
      
  });

  export default{
    passport
  }