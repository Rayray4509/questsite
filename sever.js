import express from "express";
import session from "./config/session.js";
import passport from "./config/passport.js";
import apiRouters from "./routers/apiRouters.js";
import adminRouters from "./routers/adminRouters.js";
import memberRouter from "./routers/memberRouter.js";
import aurth from "./controllers/aurth.js";
import frontRouter from "./routers/front.js"
import cors from "cors"
import https from "https"
import fs from "fs"
const app = express()
// const sever = https.createServer({
//     key: fs.readFileSync("server.key"),
//     cert: fs.readFileSync("server.crt"),

//   },app)


// app.use(cors({
//     origin:"http://192.168.50.85:5500",
//     credentials: true}));


app.use(express.json());
app.use(express.static('./dist'));
app.use(session.sessionSet);
app.use(passport.passport.initialize());
app.use(passport.passport.session());

app.use("/",frontRouter.router)
app.use("/api",apiRouters.router)
app.use("/admin",aurth.adminAurth,adminRouters.router)
app.use("/member",aurth.memberAurth,memberRouter.router)


app.listen("3000",()=>{
    console.log("sever launch");
});