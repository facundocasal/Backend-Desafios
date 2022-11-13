require('dotenv').config()
const mongoose = require('mongoose')

const connectionDB = async () => {
  try {
    mongoose.connect(process.env.MQCDB ,{dbName : process.env.MQCDBNAME }, ()=> console.log('Conexión Exitosa'))
  } catch (error) {
    console.log(error);
  }
}

connectionDB()
module.exports = { connectionDB }
