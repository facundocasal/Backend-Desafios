require('dotenv').config()
const User = require('../models/users.model')
const {hashPassword ,isValidPassword } = require('../utils/services');
const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET


const getAllUser = async (req, res) =>{
    try {
        const users = await User.find({})
        return users
    } catch (error) {
        return {message: "usuarios no encontrados"}
    }
}

const register = async ( req , res) =>{
    const {email , name , lastName , password  } = req.body
    try {
        const newUser = User({
            email,
            name,
            lastName,
            password : await hashPassword(password),
            avatar : req.file.originalname,
            role : "client"
        })
        await newUser.save()        
        return {message: "usuario Creado", status : 200 }
    } catch (error) {  
        return {message : "error al crear Usuario intente nuevamente"}
    }
}


const login = async (req , res) => {
    const {email , password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        return { message : "credenciales incorrectas"}
    }
    try {        
        const match = await isValidPassword(password , user.password)
        const payload = {
            userEmail : user.email,
            role: user.role,
            userName : user.name,
            userLastName : user.lastName,
            userAvatar : user.avatar || " "
        }
        const accessToken = jwt.sign(payload, tokenSecret , {expiresIn: "2h"})
        if(match){
            res.cookie("token", accessToken,{
                httpOnly: true
            });
            return { accessToken, message: "inicio de sesión satisfactorio" , status : 200}
        } else{
            return { message : "credenciales incorrectas"}
        }
    } catch (error) {
        res.json({ message : "error en login " , error })
    }
}

const getUser = async (email) =>{
    const user = await User.findOne({email})
    return user
}

module.exports = {
    getAllUser,
    register,
    login,
    getUser
}