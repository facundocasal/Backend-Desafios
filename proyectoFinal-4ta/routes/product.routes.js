const express = require('express');
const router = express.Router();
const controllersProduct = require('../controllers/product.controllers')
const { isAdmin} = require('../middleware/isAdmin');
const { jwtValidator } = require('../middleware/jwt');

router
.get("/", jwtValidator , controllersProduct.homeProduct)
.get("/createProduct", jwtValidator , isAdmin ,  controllersProduct.renderCreateProduct)
.get("/updateProduct", jwtValidator , isAdmin , controllersProduct.updateProductPanel )
.post("/createProduct" , jwtValidator , isAdmin , controllersProduct.createProduct )
.post("/deleteProduct", jwtValidator , isAdmin , controllersProduct.deleteProduct )
.post("/updateProduct", jwtValidator , isAdmin , controllersProduct.updateProduct )

module.exports = router;