const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const userRouter = require('./router/userRouter')
const messageRouter =  require('./router/messageRouter')

app.use(express.json())
app.use(cors())

//users
app.use( '/users' , userRouter )

//messages
app.use( '/messages' , messageRouter )

const port = process.env.port || 5000;

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});