const { Schema, model } = require('mongoose')

const cart = new Schema({
  user: {String , require: true},
  products : Array[products],
},
{
    timestamps: true,
    versionKey: false,
})

module.exports = model('Cart', cart);
