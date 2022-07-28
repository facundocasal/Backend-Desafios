import { ProductoDao } from "../Daos"



const getProduct = (req, res) => {
    const id = Number(req.params.id)
    if (id) {
        try {
            ProductoDao.getbyId(id).then(i => res.json(i))
        } catch (err) {
            console.log(`ocurrio un error ${err}`)
        }
    } else {
        try{
            ProductoDao.getAll().then(i => res.json(i))
        }catch{
            console.log(`ocurrio un error ${err}`)
        }
    }
}

const addProduct = (req, res) => {
    let { title, price, thumbnail, descripcion, codigo, precio, stock } = req.body
    let newProduct = {
        title,
        price,
        thumbnail,
        descripcion,
        codigo,
        precio,
        stock,
        tiempo: new Date().toLocaleString(),
    }
    ProductoDao.save(newProduct).then(i => res.send({ msg: `el id del producto agregado es  ${i}` }))
}

const putProduct = (req, res) => {
    const id = Number(req.params.id)
    let { title, price, thumbnail, descripcion, codigo, precio, stock } = req.body
    let newProduct = {
        title,
        price,
        thumbnail,
        descripcion,
        codigo,
        precio,
        stock,
        tiempo: new Date().toLocaleString(),
    }
    ProductoDao.putById(id,newProduct)
}

const deleteProduct = (req, res) => {
    const id = Number(req.params.id)
    ProductoDao.delete(id).then(r => res.send(r))
}

export { getProduct, addProduct, deleteProduct, putProduct }