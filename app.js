const express = require('express')
const app = express()
require('dotenv').config()
const userRouter = require('./router/userRouter')
const messageRouter =  require('./router/messageRouter')
app.use(express.json())

//users
app.use( '/users' , userRouter )

//messages
app.use( '/messages' , messageRouter )

const port = process.env.port || 3001

app.listen( port , () => {
    console.log(`listening to the port ${port}`)
})