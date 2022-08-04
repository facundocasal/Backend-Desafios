import admin from "firebase-admin";
import config from "./config";

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
});

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
}

export default ContenedorFirebase

