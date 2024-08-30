const joi = require('joi')
const model = require('../models/userModels')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const register = async (req, res, next) => {
    const dispatch = {
        name: joi.string().min(4).max(45).required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).max(45).required()
    };

    const checkinfo = joi.object(dispatch).validate(req.body);
    if (checkinfo.error) {
        console.log('Validation error:', checkinfo.error.details[0].message);
        return res.status(401).send(checkinfo.error.details[0].message);
    }

    try {
        const checkname = await model.GetNameUser(req.body.name);
        console.log('Check email result:', checkname);

        if (!checkname) {
            const user = await model.RegisterUser(req.body.name, req.body.email, req.body.password);
            if (user) {
                console.log('User registered successfully:', req.body.email);
                return res.json({ id: user.id, message: 'Welcome' }); // برگرداندن آیدی کاربر
            } else {
                console.log('User registration failed:', req.body.email);
                return res.status(500).send('Registration failed');
            }
        } else {
            console.log('User-name already registered:', req.body.email);
            return res.status(401).send('You already registered');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).send('An error occurred during registration');
    }
};

const login = async (req, res, next) => {
    const dispatch = {
        email: joi.string().email().required(),
        password: joi.string().required()
    };
    const check = joi.object(dispatch).validate(req.body);
    if (check.error) {
        console.log('Validation error:', check.error.details[0].message);
        return res.status(401).send('Please enter right information');
    }

    const checkuser = await model.GetEmailUser(req.body.email);
    if (!checkuser) {
        console.log('User not found:', req.body.email);
        return res.status(404).send('Please sign up');
    }

    if (req.body.password !== checkuser.password) {
        console.log('Invalid password for user:', req.body.email);
        return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({id: checkuser.id} , process.env.SECRET_KEY )
    console.log('Password is valid for user:', req.body.email);
    return res.header('Authorization',token).json({ id: checkuser.id, message: 'Welcome' }); // برگرداندن آیدی کاربر
};

const SearchUsers = async (req, res, next) => {
    try {
      const result = await model.Search(req.query.name);
      if (result.length > 0) {
        return res.json(result);
      } else {
        return res.status(404).send('No users found');
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal server error');
    }
};

const getUsersWithMessages = async (req, res, next) => {
    try {
        const result = await model.getUsersWithMessages(req.params.userId)
        return res.json(result)
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal server error');
    }
};

module.exports = { register , login , SearchUsers , getUsersWithMessages }