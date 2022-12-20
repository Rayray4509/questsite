import pool from '../config/db.js';
import { date } from '../config/date.js';

class UserData {
    constructor(name,hash,salt,e_mail,department) {
        this.name = name;
        this.hash = hash;
        this.e_mail = e_mail;
        this.department = department;
        this.salt = salt;
    }
    saveUserData() {
        const createAtDate = date();
        
        let spl = `
        INSERT INTO userdata(name,hash,salt,e_mail,department,servicestatus,permission,created_at)
        VALUES(
            '${this.name}',
            '${this.hash}',
            '${this.salt}',
            '${this.e_mail}',
            '${this.department}',
            '1',
            '0',
            '${createAtDate}'
        )
        `;
        return pool.execute(spl);
    }
    static findAll() {
        let sql = "SELECT* FROM userdata;"
        return pool.execute(sql);
    }
    static findByName(name) {
        const  variable = [name];
        const sql = `SELECT name FROM userdata WHERE name = ?; `
        return pool.execute(sql,variable);
    }
    static findByEmail(mail) {
        const  variable = [mail];   
        let sql = `SELECT e_mail FROM userdata WHERE e_mail = ?; `
        return pool.execute(sql,variable);
    }
    static findAllByEmail(mail) {
        const  variable = [mail];
        let sql = `SELECT * FROM userdata WHERE e_mail = ? ; `
        return pool.execute(sql,variable);
    }
    static findAllByEmailLogin(mail) {
        let sql = `SELECT * FROM userdata WHERE e_mail = '${mail}' AND servicestatus = 1 ; `
        return pool.execute(sql);
    }
    static findById(id) {
        const  variable = [id];
        let sql = `SELECT * FROM userdata WHERE id = ? ;`
        return pool.execute(sql,variable);
    }
    static numOfUserData(){
        const sql = `SELECT COUNT(id) FROM userdata; `
        return pool.execute(sql);
    }
    static findByLimit(init,end) {
        let sql = `SELECT name,e_mail,servicestatus,department FROM userdata  LIMIT ${init},${end};`
        return pool.execute(sql);
    }
    static findByKeyword(keyword) {
        const sql = `SELECT name,e_mail,servicestatus,department FROM userdata WHERE e_mail LIKE '%${keyword}%' OR name LIKE '%${keyword}%' OR department LIKE '%${keyword}%'; `
        return pool.execute(sql);
    }
    static changedServiceStatus(email,state){
        if(email == "admin@email.com") return;
        const  variable = [state,email];
        const sql = `UPDATE userdata SET servicestatus = ? WHERE e_mail = ?; `
        return pool.execute(sql,variable);
    }
    static updateUserData(name,department,email){
        if(email == "admin@email.com") return;
        const  variable = [name,department,email];
        const sql = `UPDATE userdata SET name = ? , department = ? WHERE e_mail = ?; `
        return pool.execute(sql,variable);
    }
    static updatePassword(hash,salt,email){
        const  variable = [hash,salt,email];
        const sql = `UPDATE userdata SET hash = ? , salt = ? WHERE e_mail = ?; `
        return pool.execute(sql,variable);
    }
    
}


export default UserData;


