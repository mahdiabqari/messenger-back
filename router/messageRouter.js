const express = require('express');
const Router = express.Router();
const MessageController = require('../controller/messageController');

Router.post('/send', MessageController.Sendmessage);
Router.get('/receive/:id', MessageController.Recivemessage);

module.exports = Router;
