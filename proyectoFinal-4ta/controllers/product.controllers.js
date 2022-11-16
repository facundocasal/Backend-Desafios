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
        res.render("succes", { page : "actualizacion-productos", message: product.message , redirect : "/product/createProduct"})
    }else {
        res.render("error", { page : "error-producto", message: product.message})
    }
};


const updateProductPanel = async (req, res) => {

    const products = await productDao.getAllProduct()

    res.render('updateProduct', {data: products})


}



const updateProduct = async ( req , res )=>{
    const productupdate =  await productDao.updateProduct(req, res)
    if(!productupdate){
        res.render("succes", { page : "actualizacion-productos", message: productupdate.message , redirect : "/users/panel"})
    }else{
        res.render("error", { page : "error-producto", message: productupdate .message})
    }
}



const deleteProduct = async ( req , res )=>{
    const {id} = req.body
    const productDelete =  await productDao.deletProduct(id)
    if(!productDelete){
        res.render("succes", { page : "actualizacion-productos", message: productDelete.message , redirect : "/users/panel"})
    }else{
        res.render("error", { page : "error-producto", message: productDelete.message})
    }
}


module.exports = {
    homeProduct,
    renderCreateProduct,
    updateProductPanel,
    createProduct,
    updateProduct,
    deleteProduct
};