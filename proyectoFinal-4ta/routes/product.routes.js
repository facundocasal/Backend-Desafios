const express = require('express');
const router = express.Router();
const {homeProduct , renderCreateProduct,  createProduct , updateProduct , deleteProduct} = require("../controllers/product.controllers")

const controllersProduct = require('../controllers/product.controllers')
router
.get("/" , homeProduct)
.get("/createProduct", controllersProduct.renderCreateProduct)
.post("/createProduct" , controllersProduct.createProduct )
.post("/deleteProduct", controllersProduct.deleteProduct  )
.post("/updateProduct", controllersProduct.updateProduct )

module.exports = router;