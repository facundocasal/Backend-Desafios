const Cart = require('../models/cart.model')
const Product = require('../models/products.model')

const addCart = async (req, res) => {
    const existingCart = await Cart.findOne({ user: req.user.userEmail })
    const product = await Product.findOne({ _id: req.params.id })
    try {
        if (existingCart) {
            existingCart.products.push(req.params.id)
            await existingCart.save()
            return product
        } else {
            const newCart = new Cart({ user: req.user.userEmail, products: req.params.id })
            await newCart.save()
            return product
        }
    } catch (error) {
        return {message : "error al crear el carrito"};
    }
}

const getUserCart = async (user) => {
    try {
        const userCart = await Cart.find({ user: user })
        return userCart
    } catch (error) {
        return {message : "error al obtener el carrito"};
    }
}

const deleteProductFromCart = async (req, res) => {
    let cart = await Cart.findById(req.params.cartId)
    let index = cart.products.findIndex(p => p._id == req.params.prodId)
    try {
        cart.products.splice(index, 1)
        await Cart.updateOne({ _id: req.params.cartId }, { $set: { products: cart.products } })
    } catch (error) {
        return {message : "error al borrar producto de carrito "};
    }
};


const emptyCart = async (req, res) => {

    const cart = await Cart.findOne({ user: req.user.userEmail })
    try {
        await Cart.updateOne({ _id: cart._id }, { $set: { products: [] } })
    } catch (error) {
        return {message : "error al vaciar el carrito "};
    }
}

module.exports = {
    addCart,
    getUserCart,
    deleteProductFromCart,
    emptyCart
}