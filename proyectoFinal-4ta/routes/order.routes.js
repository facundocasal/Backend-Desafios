const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controllers');
const {jwtValidator} = require('../middleware/jwt.js')
router
.post('/send', jwtValidator ,orderController.sendOrder)

module.exports =  router