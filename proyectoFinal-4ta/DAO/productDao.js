require('dotenv').config()
const Products = require('../models/products.model')


const createProduct =  async (req , res) =>{
    const {name , price , description , stock , image} = req.body;
    try {
        const newProduct = await Products({
            name,
            price,
            description : description === "" && "producto sin descripcion",
            stock,
            image : image === "" && "producto sin foto"
        });
        await newProduct.save();
        return { message : "producto Creado" , status : 200};
    } catch (error) {
        return {message : "error al crear producto"};
    }
}

const getAllProduct = async () =>{
    const products = await Products.find()
    return products
}

const getOneProduct = async (products) => {
    return await products_model.find({
      '_id': {$in: products}
    })
  
  }


const updateProduct = async (req, res) =>{
    const {id} = req.body
    try {
        await Products.findByIdAndUpdate(id, {$set: req.body})
        return{message : "producto modificado"};
    } catch (error) {
        return{message : "error al modificar el producto "};
    }
}


const deletProduct = async (id)=>{
    try {
        await Products.findByIdAndDelete(id)
        return {message : "producto eliminado"}
    } catch (error) {
        return {message : "error al eliminar Producto"}        
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    updateProduct,
    deletProduct
};