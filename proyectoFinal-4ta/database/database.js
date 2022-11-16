require('dotenv').config()
const mongoose = require('mongoose')
const connectionDB = async () => {
  try {
    mongoose.connect(`mongodb+srv://${process.env.MQCDB_USER}:${process.env.MQCDB_PASS}@facu.fujqqs3.mongodb.net/?retryWrites=true&w=majority` ,{dbName : process.env.MQCDBNAME }, ()=> console.log('Conexión Exitosa'))
  } catch (error) {
    console.log(error);
  }
}

connectionDB()
module.exports = { connectionDB }
