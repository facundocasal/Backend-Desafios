import admin from "firebase-admin";
import config from "./config";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

class ContenedorFirebase {
  constructor(colecion) {
    this.colecion = db.collection(colecion);
  }
  // LECTURA 
  async getAll() {
    try {
      const data = await this.colecion.get();
      const dataDocs = data.docs;
        let respuesta = dataDocs.forEach(item => ({
            data : item.data(),
            id : item.id
        }))
      return respuesta;
    } catch (error) {
      console.log(`error en getAll de ${this.colecion} : ${error}`);
    }
  }

  async getbyId(id) {
    try {
      const product = await this.colecion.doc(id).get();
      const productData = product.data();
      if (productData) {
        return productData;
      } else {
        return { mensaje: "el producto no existe" };
      }
    } catch (err) {
      console.log(
        `hubo un error en recuperar en la coleccion ${this.colecion} el objeto con el id ${id} : ${err}`
      );
    }
  }
  // CREAR 
  async creteCarrito() {
    const nuevoCarrito = { timestamp: "", productos: [] };
    nuevoCarrito.timestamp = new Date().toLocaleString("fr-FR");
    let resultado = await this.coleccion.add(nuevoCarrito);
    return resultado.id;
  }
  async save(obj){
    try {
        obj.timestamp = new Date().toLocaleString("fr-FR");
        const newobj = this.colecion.doc()
        await newobj.create(obj)
        return ({respuesta : "ok"})
    } catch (err) {
        console.log(`no se pudeo agregar el objeto por : ${err}`);
      }
  }

  // MODIFICAR 

  async putById(id, newProduct) {
    try {
        await this.colecion.doc(id).update(newProduct)
        return ({respuesta : `${id} modificado`})
    } catch {
      console.log(
        `hubo un error al querer modificar el objeto por id : ${err}`
      );
    }
  }

  async postProductById(id, product) {
    try {
        const carritoFind = await this.colecion.doc(id).get()
        const carritoData = carritoFind.data()
        carritoData.product.push(product)
        await this.colecion.doc(id).update(carritoData)
        return ({respuesta: "producto Agregado"})
    } catch (err) {
      console.log(`hubo un error : ${err}`);
    }
  }

  // BORRAR 
  async deleteById(id) {
    try {
        await this.colecion.doc(id).delete()
        return({respuesta : `id ${id} Borrado`})
    } catch (err) {
      console.log(`hubo un error en recuperar el objeto por id : ${err}`);
    }
  }
  async deleteAll() {
    try {
        await this.colecion.doc().delete()
    } catch (err) {
      console.log(`hubo un error : ${err}`);
    }
  }
  async deleteProduct(id, id_prod) {
    try {
        const carritoFind = await this.colecion.doc(id).get()
        const carritoData = carritoFind.data()
        carritoData.product.filter(e => e.id =! id_prod)
        await this.colecion.doc(id).update(carritoData)
        return { msj: "producto borrado " };
    } catch (err) {
      console.log(`hubo un error : ${err}`);
    }
  }
}

export default ContenedorFirebase
