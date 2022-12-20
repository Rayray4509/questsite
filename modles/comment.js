import pool from '../config/db.js';
import { date } from '../config/date.js';

class Comment {
    constructor(questid,author,comments) {
        this.questid = questid;
        this.author = author;
        this.comments = comments;
    }
    saveComment() {
        const createAtDate = date();
        
        let spl = `
        INSERT INTO comment(questid,author,comments,created_at)
        VALUES(
            '${this.questid}',
            '${this.author}',
            '${this.comments}',
            '${createAtDate}'
        )
        `;
        return pool.execute(spl);
    }
    static findByQustId(id) {
        const  variable = [id];
        const sql = `SELECT author,comments,created_at FROM comment WHERE questid = ? ;`
        return pool.execute(sql,variable);
    }

    
    
}


export default Comment;


