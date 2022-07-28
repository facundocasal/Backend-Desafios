const express = require("express")
const { Server: IOServer } = require("socket.io")
const app = express()
const path = require("path")
const serverExpress = app.listen(8080, () => console.log('Servidor escuchando puerto 8080'))
const io = new IOServer(serverExpress)
const  { Contenedor }  = require("./contenedor.js")

app.use(express.static( path.join(__dirname , './public')))

const productosList = new Contenedor('./productos.txt');
const messageLog = new Contenedor('./messageLog.txt');


io.on('connection', async socket => {
    console.log(`se conecto el cliente id : ${socket.id}`)

    let mensajes = await messageLog.getAll()

    io.emit("server:mensajes", mensajes)

    socket.on("mensaje:cliente", async messageInfo => {
        await messageLog.save(messageInfo)
        mensajes = await  messageLog.getAll()
        io.emit('server:mensajes',  mensajes)        
    })

    let listaProductos = await productosList.getAll();

    io.emit("producto:server", listaProductos)

    socket.on("producto:cliente", async productInfo => {
        await productosList.save(productInfo)
         
        listaProductos = await productosList.getAll();
        io.emit("producto:server", listaProductos)         
    })
})

