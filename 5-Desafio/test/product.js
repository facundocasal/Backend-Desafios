import { Router } from "express";
import { faker } from "@faker-js/faker";
const router = Router();

faker.locale = "es"


router.route("/").get((req, res)=>{
    let productos = [];

    for (i=0; i<10; i++){
        let producto = {};
        producto.title = faker.commerce.productName();
        producto.imgUrl = faker.image.image();
        producto.price = faker.commerce.price();
        productos.push(producto)
    }

    res.json(productos);
})


export default router