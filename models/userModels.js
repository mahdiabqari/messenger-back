const pool = require('../db/MySQL')

class UserModels {
    
    static RegisterUser = async ( name , email , password ) => {
        const [result] = await pool.query( `insert into users (id,name,email,password) values (uuid(),?,?,?)` , [ name , email , password ])
        return result[0]
    }

    static GetEmailUser = async ( email ) => {
        const [result] = await pool.query(`select * from users where email = ?` , [ email ] )
        return result[0]
    }

}

module.exports = UserModels