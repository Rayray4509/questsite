import pool from '../config/db.js';
import { date } from '../config/date.js';

class Quest {
    constructor(title,content,author) {
        this.title = title;
        this.content = content;
        this.author =author;
    }
    saveQuest() {
        const createAtDate = date();
        
        let spl = `
        INSERT INTO quest(title,content,author,state,created_at)
        VALUES(
            '${this.title}',
            '${this.content}',
            '${this.author}',
            '1',
            '${createAtDate}'
        )
        `;
        return pool.execute(spl);
    }
    static findAll() {
        let sql = "SELECT* FROM quest;"
        return pool.execute(sql);
    }
  
    static findById(id) {
        const  variable = [id];
        let sql = `SELECT * FROM  quest WHERE id = ? AND state = 1;`
        return pool.execute(sql,variable);
    }
    static numOfQuest(){
        const sql = `SELECT COUNT(id) FROM quest WHERE state = 1; `
        return pool.execute(sql);
    }
    static numOfPersonalQuest(email){
        const  variable = [email];
        const sql = `SELECT COUNT(id) FROM quest WHERE author = ? AND state = 1; `
        return pool.execute(sql,variable);
    }
    static findByLimit(init,end) {
        let sql = `SELECT * FROM quest WHERE state = 1 ORDER BY id DESC LIMIT ${init},${end}   ;`
        return pool.execute(sql);
    }
    static findByKeyword(keyword) {
        const sql = `SELECT * FROM quest WHERE title LIKE '%${keyword}%' AND state = 1 ; `
        return pool.execute(sql);
    }
    static findByEmailLimit(init,end,e_mail) {
        const  variable = [e_mail];
        let sql = `SELECT * FROM quest WHERE author = ?  AND state = 1 ORDER BY id DESC LIMIT ${init},${end} ;`
        return pool.execute(sql,variable);
    }
    static updateQuestById(content,id){
        const  variable = [content,id];
        const sql = `UPDATE quest SET content = ? WHERE id = ?; `
        return pool.execute(sql,variable);

    }
    static delQuest = (id)=>{
        const  variable = [id];
        const sql = `UPDATE quest SET state = 0 WHERE id = ?; `
        return pool.execute(sql,variable);

    }
    
    
}


export default Quest;


