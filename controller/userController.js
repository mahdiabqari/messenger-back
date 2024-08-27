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
    if (checkinfo.error) return res.status(404).send(checkinfo.error.details[0].message);

    const checkemail = await model.GetEmailUser(req.body.email);
    if (checkemail) return res.status(404).send('You already registered');


    const user = await model.RegisterUser( req.body.name , req.body.email , req.body.password );
    const token = jwt.sign( { id: checkemail.id } , process.env.SECRET_KEY )
    return res.header('Auth' , token).send('Wellcome');
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
        return res.status(404).send('Please Sign in');
    }

    if ( req.body.password !== checkuser.password ) {
        console.log('Invalid password for user:', req.body.email);
        return res.status(401).send('Invalid password');
    }

    console.log('Password is valid for user:', req.body.email);
    const token = jwt.sign({ id: checkuser.id }, process.env.SECRET_KEY);
    return res.send({ message: 'Welcome!', token });

};


module.exports = { register , login }