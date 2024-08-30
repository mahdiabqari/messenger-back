const joi = require('joi');
const model = require('../models/messageModels');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const Sendmessage = async (req, res, next) => {
  const dispatch = {
    sender_id: joi.string().required(),
    receiver_id: joi.string().required(),
    message: joi.string().min(1).max(400).required(),
  };
  const check = joi.object(dispatch).validate(req.body);

  if (check.error) {
    return res.status(400).send(check.error.details[0].message);
  }

  try {
    const result = await model.Send(req.body.sender_id, req.body.receiver_id, req.body.message);
    if (result) {
      const token = jwt.sign({id:req.body.sender_id},process.env.SECRET_KEY)
      return res.header('Authorization',token).send('Message sent successfully');
    } else {
      return res.status(500).send('Error sending message');
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('Internal server error');
  }
};

const Recivemessage = async (req, res, next) => {
  try {
    console.log(req.params.senderId , req.params.receiverId)
    const result = await model.Recive(req.params.senderId , req.params.receiverId);
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.status(404).send('No messages found');
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send('Internal server error');
  }
};

module.exports = { Sendmessage, Recivemessage };
