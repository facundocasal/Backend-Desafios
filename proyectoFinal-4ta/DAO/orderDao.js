const Order = require('../models/order.model')

const newOrder = async (orden) => {
    const newOrder = await Order.create(orden);
    return newOrder
}

module.exports = {
    newOrder
}
