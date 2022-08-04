import ContenedorFirebase from "../contenedor";


class ProductoDaosFirebase extends ContenedorFirebase {
    constructor() {
      super("productos");
    }
}

let productDao = new ProductoDaosFirebase
  
export default productDao;