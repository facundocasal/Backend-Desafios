const express = require('express');
const router = express.Router();
const { register , login ,  createUser , loginUser , logOut ,  panel} = require('../controllers/user.controllers')

router
.get("/register" , register)
.get("/login" , login)
.get("/panel" , panel)
.get("/logOut" , logOut)
.post("/register" , createUser)
.post("/login" , loginUser)


module.exports = router;
