const orderDao = require('../DAO/orderDao')
const {sendMail} = require('../utils/services')
const cartDao = require('../DAO/cartDao')



const sendOrder = async (req, res) => {
        const nuevaOrden = {
            user : req.user.userEmail,
            prod: req.body.product
        }
        
        const orden = await orderDao.newOrder(nuevaOrden)

        sendMail(req.user.userEmail, "Nueva orden", `Nueva orden recibida con el id ${orden._id}
        
        y con los siguientes productos: 
        
        ${nuevaOrden.prod.prueb}`)

        
        await cartDao.emptyCart(req, res)

        res.render('succes', {page:"compra", message: `Orden enviada con el id ${orden._id}` , redirect : "/users/panel"})
}

module.exports = {
    sendOrder
}