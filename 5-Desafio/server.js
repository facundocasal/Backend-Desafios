import express from "express"
import normalizeMensajes from "./normalizer/normalizer"
import 'dotenv/config'
import path from "path"
import router from "./test/product"
import productDao from "./Dao/productosDao"
import menssageDao from "./Dao/MenssageDaosFirebase"
const { Server: IOServer } = require("socket.io")
const app = express()




const serverExpress = app.listen(8080, () => console.log('Servidor escuchando puerto 8080'))

const io = new IOServer(serverExpress)


app.use(express.static( path.join(__dirname , './public')))

app.use("/api/productos", router)



io.on('connection', async socket => {
    console.log(`se conecto el cliente id : ${socket.id}`)

    let mensajes = await menssageDao.getAll()

    const normalizeMsj = normalizeMensajes(mensajes)

    // io.emit("server:mensajes", mensajes)


    socket.emit("server:itemsProduct-Msj", { productos: [], mensajes: normalizeMsj })

    socket.on("mensaje:cliente", async messageInfo => {
        await menssageDao.save(messageInfo)
        mensajes = await  menssageDao.getAll()
        io.emit('server:mensajes',  mensajes)        
    })

    let listaProductos = await productDao.getAll();

    // io.emit("producto:server", listaProductos)

    socket.on("producto:cliente", async productInfo => {
        await productDao.save(productInfo)
        listaProductos = await productDao.getAll();
        io.emit("producto:server", listaProductos)         
    })
})

