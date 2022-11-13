const productDao = require('../DAO/productDao');


const homeProduct = async (req , res ) => {
    const productsList = await productDao.getAllProduct()
    res.render("product" , { page : " Home - productos" ,   products : productsList  });
};

const renderCreateProduct = async ( req , res )=>{
    res.render("formProduct" , { page : " Home - admin - Product Create"});
};

const createProduct =  async (req , res) =>{
    const product = await productDao.createProduct(req, res);
    if(product.status === 200){
        res.render("succes", { page : "producto creado", message: product.message , redirect : "/product/createProduct"})
    }else {
        res.render("error", { page : "error-crear-producto", message: product.message})
    }
};

const updateProduct = async ( req , res )=>{
    const productupdate =  await productDao.updateProduct(req, res)
    if(!productupdate){
        res.json(productupdate.message)
    }else{
        res.json(productupdate.message)
    }
}

const deleteProduct = async ( req , res )=>{
    const {id} = req.body
    const productDelete =  await productDao.deletProduct(id)
    if(!productDelete){
        res.json(productDelete.message)
    }else{
        res.json(productDelete.message)
    }
}


module.exports = {
    homeProduct,
    renderCreateProduct,
    createProduct,
    updateProduct,
    deleteProduct
};