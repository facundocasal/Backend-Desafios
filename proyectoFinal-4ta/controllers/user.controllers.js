const userDao = require('../DAO/userDao')

const login =  (req , res) =>{
    res.render("login" , {page : "inicio sesion"})
}

const register = (req, res ) =>{
    res.render("register" ,{page : "registro"})
}
const createUser = async (req, res) => {
    const newUser = await userDao.register(req , res)
    if (newUser.status === 200) {
        res.render("succes", { page : "usuario creado", message: newUser.message , redirect : "/users/login"})
    } else {
        res.render("error", { page : "error usuario", message: newUser.message})
    }
}

const loginUser = async (req , res) => {
    const user = await userDao.login(req , res)
    if (user.status === 200) {
        res.render("logSucces", { 
            page : "inicio de sesión satisfactorio",
            message: user.message,
            accessToken :user.accessToken
        })
    } else {
        res.render("error", { page : "error-login", message: user.message})
    }
} 

const logOut = async (req, res) =>{
    res.render("logOut" , {page : "cierre de secion" , message : "Adios "})
}

const panel = async (req , res) =>{
    res.render("userInfo", {page : "Panel Usuario" , message : "Panel Usuario"})
} 



module.exports = { register , login , createUser , loginUser , logOut ,  panel}
