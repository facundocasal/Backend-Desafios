const express = require('express');
const router = express.Router();
const { register , login ,  createUser , loginUser , logOut ,  panel} = require('../controllers/user.controllers')
const { jwtValidator } = require('../middleware/jwt');
const  upload  = require('../utils/multer');
const { validateEmail} = require('../helpers/validation')

router
.get("/register" , register)
.get("/login" , login)
.get("/panel" ,jwtValidator, panel)
.get("/logOut" , logOut)
.post("/register" , upload.single('avatar'), validateEmail, createUser)
.post("/login" , loginUser)


module.exports = router;
