const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const userRouter = require('./router/userRouter')
const messageRouter =  require('./router/messageRouter')
//Test
const MessageController = require('./controller/messageController');

app.use(express.json())
app.use(cors())

//users
app.use( '/users' , userRouter )

//messages
app.use( '/messages' , messageRouter )

app.get('/' , ( req , res ) => {
    res.send('HELLO THERE IS NO PROBLEM HERE')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});