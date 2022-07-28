import { CarritoDao } from "../Daos/index.js"
import { ProductoDao } from "../Daos/index.js"

const createCar = (req, res) =>{
    let { title, price, thumbnail, descripcion, codigo, precio, stock } = req.body
    let newCarrito = {
        tiempo: new Date().toLocaleString(),

        product : {
            title,
            price,
            thumbnail,
            descripcion,
            codigo,
            precio,
            stock,
            hora: new Date().toLocaleString()}
    }
    CarritoDao.save(newCarrito).then(i => res.send(`el id del carrito creado es ${i}`))
}

const deleteCarrito = (req , res)=>{
    const id = Number(req.params.id)
    CarritoDao.deleteById(id).then(r => res.send(r))
}



const getProductByCar = (req , res) =>{
    const id = Number(req.params.id)
    CarritoDao.getbyId(id).then(i => res.send(i.product))
}


const postProduct = async (req , res)=>{
    const id = Number(req.params.id)
    const idCart = Number(req.body.id)
    let product = await ProductoDao.getbyId(id)
    CarritoDao.postProductById(idCart, product).then(r => res.send(r))
}


const deleteProducByCar = (req , res)=>{
    const id = Number(req.params.id)
    const idProduct = Number(req.params.id_prod)
    CarritoDao.deleteProduct(id,idProduct).then(r => res.send(r))
}



export {createCar , deleteCarrito, getProductByCar , deleteProducByCar , postProduct}