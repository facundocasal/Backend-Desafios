const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controllers');
const {jwtValidator} = require('../middleware/jwt.js');
 
router
.get("/" , jwtValidator , cartController.getCart)
.post("/:id" , jwtValidator , cartController.addCart)
.post("/:cartId/:prodId", cartController.deleteProduct)

module.exports = router