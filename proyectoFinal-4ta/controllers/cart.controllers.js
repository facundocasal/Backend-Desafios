const cartDao = require('../DAO/cartDao')
const productDao = require('../DAO/productDao')


const getCart = async (req, res) => {
    const cart = await cartDao.getUserCart(req.user.userEmail) 
    if (cart[0]) {
        const products =  await productDao.getOneProduct(cart[0].products)
        res.render('cart', {
            data: req.user.userEmail,
            products: products,
            cart: cart[0].id,
            page: "carrito"
        })
    } else {
        res.render("error", { page : "carrito", message: 'No agregaste productos al carrito'})
    }
}

const addCart = async (req, res) => {
    const product = await cartDao.addCart(req, res)
    res.render('added', {product})
}

const deleteProduct = async (req, res) => {
    await cartDao.deleteProductFromCart(req, res)
    res.render("succes", { page : "carrito", message: "producto borrado" , redirect : "/product"})
}

module.exports = {
    getCart,
    addCart,
    deleteProduct
}