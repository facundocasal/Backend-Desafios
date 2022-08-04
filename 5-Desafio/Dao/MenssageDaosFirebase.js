import ContenedorFirebase from "../contenedor";


class MenssageDaosFirebase extends ContenedorFirebase {
    constructor() {
      super("Menssage");
    }
  }

  let menssageDao = new MenssageDaosFirebase
  
  export default menssageDao;