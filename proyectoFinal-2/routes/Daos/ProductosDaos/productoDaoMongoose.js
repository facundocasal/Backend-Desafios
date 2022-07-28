import ContenedorMongoose from "../../constructor/ContenedorMongo.mjs";


class ProductoDaoMongo extends ContenedorMongoose {
    constructor() {
      super("productos", {
        timestamp : { type: Date, required: true },
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        descripcion: {type: String , required: true},
        codigo : {type: String , required: true},
        stock: { type: Number, required: true },
      });
    }
  }
  
  export default ProductoDaoMongo;