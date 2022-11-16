const express = require('express');
const router = express.Router();
const userRoute = require('./users.routes');
const productRoute = require ('./product.routes.js');
const cartRoute = require('./cart.routes');
const orderRoute = require('./order.routes')
// index 

router.get("/", (req , res )=>{ res.render("index",{
  title : "Back de ecommerce" ,
  subtitle: "inicia seccion",
  page: "incio"})});

router.use("/users", userRoute);
router.use("/product" , productRoute);
router.use("/cart" , cartRoute);
router.use('/orders', orderRoute)

router.get("/config" , (req, res) =>{
  const config = {
    database : "mongoDb",
    mongoUser : "facundocasal",
    mongoPass : "facu123",
    dataBaseName : "ecommerce",
    tokenSecret : "facusecret",
    emailAdmin : "fcasal92@gmail.com",
    emailPass : "mlxnhkoxcqzkecqa",
    portSocket : 3050,
    emailUserAdmin: "facu@gmail.com",
    passUserAdmin: "facu123"
  }
  res.render("config", { page : "config",  config , title: "configuracion" })
})

router.get('/error', (req, res) => {res.render('error', {message: 'error'})})


module.exports = router;