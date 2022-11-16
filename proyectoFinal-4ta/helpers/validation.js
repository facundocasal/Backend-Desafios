const User = require('../models/users.model')

const validateEmail = async(req, res, next) => {
  const {email} = req.body
  const isEmail = await User.findOne({ email : { $regex: email,  $options:'i' }})
  if (isEmail) {
    return res.render("error" , {page : "error-login" , message: '* Este email ya se encuentra registrado' } )
  }
  next()
}



module.exports = { validateEmail}
