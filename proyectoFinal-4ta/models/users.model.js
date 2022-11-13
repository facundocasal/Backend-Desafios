const { Schema, model } = require('mongoose')

const user = new Schema({
  email: {type : String , require: true},
  name: {type: String, require: true},
  lastName: {type: String},
  password: {type: String, require: true},
  avatar : {type: String},
  role: {type: String , require: true},
},
{
    timestamps: true,
    versionKey: false,
})

module.exports = model('User', user)
