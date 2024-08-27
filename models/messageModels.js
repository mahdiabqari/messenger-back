const pool = require('../db/MySQL');

class MessageModels {
    static Send = async (sender_id, receiver_id, message) => {
        const [result] = await pool.query(
            `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`,
            [sender_id, receiver_id, message]
        );
        return result;
    }

    static Recive = async (id) => {
        const [result] = await pool.query(
            `SELECT * FROM messages WHERE reciver_id = ?`,
            [id]
        );
        return result;
    }
}

module.exports = MessageModels;
