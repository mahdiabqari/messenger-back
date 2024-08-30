const express = require('express');
const Router = express.Router();
const MessageController = require('../controller/messageController');
const auth = require('../middlewares/auth')

Router.post('/send', MessageController.Sendmessage);
Router.get('/:senderId/:receiverId', MessageController.Recivemessage);


module.exports = Router;
