const User = require('../models/users')

const validateEmail = async(req, res, next) => {
  const {email} = req.body
  const isEmail = await User.findOne({ email : { $regex: email,  $options:'i' }})
  if (isEmail) {
    return res.status(401).json({email: {message: '* Este email ya se encuentra registrado', status: 401}})
  }
  next()
}



module.exports = { validateEmail}
