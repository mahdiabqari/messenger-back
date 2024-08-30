const pool = require('../db/MySQL')

class UserModels {
    
    static RegisterUser = async (name, email, password) => {
        const [result] = await pool.query(`INSERT INTO users (id, name, email, password) VALUES (uuid(), ?, ?, ?)`, [name, email, password]);
        if (result.affectedRows > 0) {
            const [user] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);
            return user[0];
        }
        return null;
    }

    static GetEmailUser = async (email) => {
        const [result] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
        return result[0];
    }
    
    static GetNameUser = async (name) => {
        const [result] = await pool.query(`SELECT * FROM users WHERE name = ?`, [name]);
        return result[0];
    }
    
    static Search = async (name) => {
        const [result] = await pool.query(
          `SELECT * FROM users WHERE name LIKE ?`,
          [`%${name}%`]
        );
        return result;
    };

    static getUsersWithMessages = async (userId) => {
        const query = `
            SELECT DISTINCT u.id, u.name, u.email
            FROM users u
            JOIN messages m ON u.id = m.sender_id OR u.id = m.receiver_id
            WHERE m.sender_id = ? OR m.receiver_id = ?
        `;
        const [result] = await pool.query(query, [userId , userId]);
        return result;
    };
    

}

module.exports = UserModels