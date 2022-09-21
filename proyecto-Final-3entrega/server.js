import  express  from "express";
import router from "./routes/UserRoutes.js"
import session from 'express-session';

import mongoose from "mongoose";


await mongoose.connect(
    "mongodb+srv://facundocasal:facu123@cluster0.66urz1f.mongodb.net/?retryWrites=true&w=majority")
    
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', "./views")
// app.set('views', new URL('./views', import.meta.url).pathname)
app.set('view engine', 'ejs')

app.use("/", router)



app.listen( process.env.PORT || 3000, ()=>{
    console.log("server prendido")
} )