import dotenv from "dotenv";
dotenv.config();

let ProductoDao;
let CarritoDao;

switch (process.env.DATABASE) {
  case "firebase":
    const { default: ProductoDaoFirebase } = await import(
      "./ProductosDaos/productoDaoFirebase.js"
    );
    const { default: CarritoDaoFirebase } = await import(
      "./CarritoDaos/carritoDaoFirebase.js"
    );

    ProductoDao = ProductoDaoFirebase;
    CarritoDao = CarritoDaoFirebase;

    break;
  case "mongo":
    const { default: ProductoDaoMongo } = await import(
      "./ProductosDaos/productoDaoMongoose.js"
    );
    const { default: CarritoDaoMongo } = await import(
      "./CarritoDaos/carritoDaoMongoose.js"
    );

    ProductoDao = ProductoDaoMongo;
    CarritoDao = CarritoDaoMongo;

    break;
}

export { ProductoDao, CarritoDao };