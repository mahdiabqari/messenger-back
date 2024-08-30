const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth( req , res , next ) {
    const token = req.header('Authorization')
    if(!token) return res.status(401).send('Access denied')

    try{
        const decode = jwt.verify(token , process.env.SECRET_KEY)
        req.messageData = decode
        next()
    } catch(err) {
        return res.status(400).send('token not found')
    }
}

module.exports = auth