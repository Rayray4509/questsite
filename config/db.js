import {config} from 'dotenv'
import mysql2 from 'mysql2'
config();
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dateStrings:true
})




export default pool.promise();
