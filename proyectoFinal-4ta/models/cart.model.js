const { Schema, model } = require('mongoose')

const cart = new Schema({
  user: {type : String , require: true},
  products : {type: Array},
},
{
    timestamps: true,
    versionKey: false,
})

module.exports = model('Cart', cart);
