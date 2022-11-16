const { Schema, model } = require('mongoose')

const order = new Schema({
    user: {type : String , require: true},
    prod: {type: Array},
});


module.exports = model('Order', order);