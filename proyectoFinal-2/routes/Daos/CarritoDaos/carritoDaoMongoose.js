import ContenedorMongoose from "../../constructor/ContenedorMongo.mjs";

class CarritoDaoMongo extends ContenedorMongoose {
  constructor() {
    super("carritos", {
      timestamp: { type: String, required: true },
      productos: { type: Array, required: true },
    });
  }
}

export default CarritoDaoMongo;