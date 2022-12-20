import pool from '../config/db.js';
import { date } from '../config/date.js';

class WhiteSheet {
    constructor(e_mail) {
        this.e_mail = e_mail;
    }
    saveWhiteSheet() {
        const createAtDate = date();
        
        let spl = `
        INSERT INTO whitesheet(e_mail,isallowed,created_at)
        VALUES(
            '${this.e_mail}',
            '1',
            '${createAtDate}'
        )
        `;
        return pool.execute(spl);
    }
    static findEmailByLimit(init,end) {
        let sql = `SELECT e_mail FROM whitesheet WHERE isallowed = 1 LIMIT ${init},${end};`
        return pool.execute(sql);
    }
    static findIsallowedByEmail(email) {
        const  variable = [email];
        const sql = `SELECT isallowed FROM whitesheet WHERE e_mail = ?; `
        return pool.execute(sql,variable);
    }
    static findAllowedByEmail(email) {
        const  variable = [email];
        const sql = `SELECT isallowed FROM whitesheet WHERE e_mail = ? AND isallowed = 1; `
        return pool.execute(sql,variable);
    }
    static numOfWhiteSheet(){
        const sql = `SELECT COUNT(id) FROM whitesheet; `
        return pool.execute(sql);
    }

    static findEmailByKeyword(keyword) {
        const sql = `SELECT e_mail FROM whitesheet WHERE e_mail LIKE '%${keyword}%' AND isallowed = 1; `
        return pool.execute(sql);
    }
    static updateIsallowed(state,email){
        const  variable = [state,email];
        const sql = `UPDATE whitesheet SET isallowed = ? WHERE e_mail = ?; `
        return pool.execute(sql,variable);

    }

   
    
}


export default WhiteSheet;


