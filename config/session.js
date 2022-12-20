import session from "express-session";
import MySQLStore from "express-mysql-session";
import pool from "./db.js"


const sessionStore = new MySQLStore({}, pool);

const sessionSet = session({
	key: 'su3cl387',
	secret: 'su3cl387',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
    cookie:{
		//sameSite: 'none',
        maxAge:1000*60*60*24*10,
		//secure:true
    }
})


export default {
    sessionSet
}