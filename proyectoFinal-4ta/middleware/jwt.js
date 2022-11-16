require('dotenv').config()
const jwt = require("jsonwebtoken")

const token_secret = process.env.TOKEN_SECRET

const jwtValidator = async(req, res, next) => {
  
  const accessToken = req.cookies.token

  try {
    const decode = jwt.verify(accessToken, token_secret)
    if (decode) {
      req.user = decode
      return next()
    }
    return res.status(404).json({
      message: "User Not found!"
    })
  } catch (error) {
      res.render("error" , {page : "error-login" , message: "debes estar logueado para tener acceso , puede que tu sesión haya expirado"})
  }
}

module.exports = { jwtValidator }
