const express = require('express')
const Router = express.Router()
const UserController = require('../controller/userController')

Router.post( '/register' , UserController.register )

Router.post( '/login' , UserController.login )

Router.get('/search', UserController.SearchUsers);

Router.get('/friends/:userId', UserController.getUsersWithMessages);

module.exports = Router