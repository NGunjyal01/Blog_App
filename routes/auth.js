const express = require('express');
const authRouter = express.Router();

const {createUser} = require('../controllers/auth');

authRouter.post('/signup',createUser);


module.exports = authRouter;