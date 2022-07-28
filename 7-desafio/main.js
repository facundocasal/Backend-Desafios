// creamos la base 
//use ecomerse

// entramos a la base 
db

const productos = [{
    nombre: "lapiz",
    precio: 120,
    img: "googl"
}, {
    nombre: "regla",
    precio: 1500,
    img: "googl"
}, {
    nombre: "lapicera",
    precio: 750,
    img: "googl"
}, {
    nombre: "liqui",
    precio: 3200,
    img: "googl"
}, {
    nombre: "transportador",
    precio: 4501,
    img: "googl"
}, {
    nombre: "marcador",
    precio: 2050,
    img: "googl"
}, {
    nombre: "cuadrerno",
    precio: 3623,
    img: "googl"
}, {
    nombre: "carpeta",
    precio: 1800,
    img: "googl"
}, {
    nombre: "hoja a4",
    precio: 4200,
    img: "googl"
}, {
    nombre: "hoja Rivadavia",
    precio: 2900,
    img: "googl"
},]
const mensaje = [{
    user: "facu",
    mensaje : "hola"
},{
    user: "caro",
    mensaje : "hola"
},{
    user: "martin",
    mensaje : "hola"
},{
    user: "lucas",
    mensaje : "hola"
},{
    user: "cereza",
    mensaje : "hola"
},{
    user: "uma",
    mensaje : "hola"
},{
    user: "daniela",
    mensaje : "hola"
},{
    user: "leandro",
    mensaje : "hola"
},{
    user: "ezequiel",
    mensaje : "hola"
},{
    user: "ricardo",
    mensaje : "hola"
},]
//insertar los datos 
db.productos.insertMany(productos)
db.mensajes.insertMany(mensaje)
// mostrar los objetos
db.productos.find()
db.mensajes.find()
//contar los objetos que tenemos 
db.productos.estimatedDocumentCount()
db.mensajes.estimatedDocumentCount()
// agregar un producto mas a la coleccion de productos 
db.productos.insertOne({nombre: "mesa", precio: 1600 , img: "google"})
// buscar productos que tengan precio menor a 1000
db.productos.find({nombre:{precio: {$lt : 1000}}})
// buscar productos entre 1000 y 3000 
db.productos.find({$and: [{precio: {$gt : 1000}},{precio: {$lt : 3000}}]})
// buscar productos con precio mayor a 3000
db.productos.find({precio: {$gt : 3000}})
// traer solo el nombre del 3 producto mas barato 
db.productos.find({},{nombre: 1}).sort({precio : 1}).skip(3).limit(1)
// agregar stock a 100 
db.productos.updateMany({}, {$set: {stock: 100} } , {upsert :true})
// cambiar el stock a 0 a los productos con precio mayor a 4000 
db.productos.updateMany({precio : {$gt: 4000}}, {$set: {stock: 0} })
// eliminar los productos que tengan un precio menor a 1000 
db.productos.deleteMany({precio: {$lt : 1000}})
// crear usuario 

// use admin
db
db.createUser({ user : "pepe" , pwd: "asd456" , roles : [{role: "read" , db: "ecommerce"}]})