require('dotenv').config()
const jwt = require("jsonwebtoken")

const isAdmin = async (req , res , next) =>{
    try {
        if(req.role === "admin"){
            next()
        } else {
            res.status(401).json({error : "no tiene acceso" })
        }
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {isAdmin}