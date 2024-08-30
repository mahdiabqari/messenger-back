const pool = require('../db/MySQL');

class MessageModels {
  
  static Send = async (sender_id, receiver_id, message) => {
    const [result] = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`,
      [sender_id, receiver_id, message]
    );
    return result;
  };

  static Recive = async ( senderId , receiverId ) => {
    const [result] = await pool.query(
      `select * from messages where sender_id = ? and receiver_id = ? or sender_id = ? and receiver_id = ?
      ORDER BY timestamp ASC`,
      [senderId , receiverId , receiverId , senderId]
    );
    return result;
  };

}

module.exports = MessageModels;
