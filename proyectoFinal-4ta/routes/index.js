const express = require('express');
const router = express.Router();
const userRoute = require('./users.routes')
const productRoute = require ('./product.routes.js')
const cartRoute = require('./cart.routes');

// index 

router.get("/", (req , res )=>{ res.render("index",{
  title : "Back de ecommerce" ,
  subtitle: "inicia seccion",
  page: "incio"})});

router.use("/users", userRoute);
router.use("/product" , productRoute)


router.get('/error', (req, res) => {res.render('error', {message: 'error'})})


module.exports = router;