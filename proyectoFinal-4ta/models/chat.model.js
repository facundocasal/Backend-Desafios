const { Schema, model } = require('mongoose')


const chat = new Schema({
  author: {
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    alias: { type: String, required: true },
  },
  text: { type: String, required: true },
  fechaHora: { type: String, required: true },
})

module.exports = model('Chat', chat)
