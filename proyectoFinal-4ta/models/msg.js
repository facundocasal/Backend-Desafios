const { Schema, model } = require('mongoose')

const cart = new Schema({
  user: {String , require: true},
  msg : {String , require: true},
  msgTo : {String}
},
{
    timestamps: true,
    versionKey: false,
})

module.exports = model('Cart', cart)