const express = require("express")
const { Server: IOServer } = require("socket.io")
const app = express()
const path = require("path")
const serverExpress = app.listen(8080, () => console.log('Servidor escuchando puerto 8080'))
const io = new IOServer(serverExpress)
const  ContenedorProduct  = require("./contenedorSql.js")
const ContenedorChat = require("./contenedorSqlChat.js")
const {dataMsg , dataProduct}  = require("./database")
const createTableProduct = require("./tables/productTable")
const createChatTable = require("./tables/chatTable")

app.use(express.static( path.join(__dirname , './public')))

const productosList = new ContenedorProduct(dataProduct, "productos", createTableProduct);
const messageLog = new ContenedorChat(dataMsg, "msgs", createChatTable);


io.on('connection', async socket => {
    console.log(`se conecto el cliente id : ${socket.id}`)

    const mensajes = await messageLog.getAll()
    const listaProductos = await productosList.getAll();
    
    socket.emit("server:mensajes", mensajes)
    socket.emit("producto:server", listaProductos)

    socket.on("mensaje:cliente", async messageInfo => {
        await messageLog.save(messageInfo)
        io.emit('server:mensajes',  messageInfo)        
    })

    socket.on("producto:cliente", async productInfo => {
        await productosList.save(productInfo)
        io.emit("producto:server", listaProductos)         
    })
})

