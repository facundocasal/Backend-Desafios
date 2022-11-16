require('dotenv').config()
const jwt = require("jsonwebtoken")

const isAdmin = async (req , res , next) =>{
    try {
        if(req.user.role === "admin"){
            next()
        } else {
            res.render("error" , {page : "error-login" , message: "Ruta protegida"})
        }
    } catch (error) {
        console.log(error)
    } 
}

module.exports = {isAdmin}