const { Schema, model } = require('mongoose')

const products = new Schema({
  name: {type :String , require: true},
  price: {type : Number , require: true},
  description: {type : String , default : "sin descripcion"},
  image: {type : String , default : "sin foto"},
  stock: {type : Number , require: true},
},
{
    timestamps: true,
    versionKey: false,
})

module.exports = model('Products', products)