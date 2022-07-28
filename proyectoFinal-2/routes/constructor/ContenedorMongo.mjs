import config from "./config"
import mongoose from "mongoose"

await mongoose.connect(config.mongodb.connectionString);

class ContenedorMongoose {
    constructor(coleccion , schema) {
        this.coleccion = mongoose.model(coleccion , schema)
    }
    
    async getAll() {
        try {
            const data = await this.coleccion.find({}, {__v : 0})
            return data
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }

    async getbyId(id) {
        try {
            const objFind = await this.coleccion.findById(id , {__v : 0})
            if (objFind) {
                return objFind
            } else {
                return { mensaje: "el producto no existe" }
            }
        } catch (err) {
            console.log(`hubo un error en recuperar el objeto por id : ${err}`)
        }
    }

    async save(obj) {
        try {
            const data =  new this.coleccion(obj)
            const dataGuardada = await data.save()
            return ({resultado: `guardado: ${dataGuardada}`})
        } catch (err) {
            console.log(`no se pudeo agregar el objeto por : ${err}`)
        }
    }


    async putById(id, newProduct) {
        try {
            await this.coleccion.updateOne({id}, {$set: {newProduct}}) 

            return ({resultado: "producto modificado"})
        } catch {
            console.log(`hubo un error al querer modificar el objeto por id : ${err}`)
        }
    }


    async deleteById(id) {
        try {
            await this.coleccion.deleteOne({id})
            return { mensaje: "producto borrado" }
        } catch (err) {
            console.log(`hubo un error en recuperar el objeto por id : ${err}`)
        }

    }
    // elimina todos 
    async deleteAll() {
        try {
            await this.coleccion.remove({})
            return { msj: "contenido borrado" }
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }

    async deleteProduct(id, id_prod) {
        try {
            const objFind = await this.coleccion.findById(id , {__v : 0})
            objFind.product = objFind.product.filter(e => e.id != id_prod)
            await this.coleccion.updateOne({id}, {$set: {product: objFind.product}}) 
            return { msj: "producto borrado " }
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }


    async postProductById(id, product) {
        try {
            const data = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(data)
            let cartFind = dataParse.find(item => item.id == id)
            cartFind.product.push(product)
            dataParse = [...dataParse, cartFind]
            await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(dataParse))
            return { msj: `producto agregado al carrito con id ${id}` }
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }
}


export default ContenedorMongoose