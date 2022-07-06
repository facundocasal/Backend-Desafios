import fs from 'fs'

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }
    //guardar el objeto en el archivo y devolver el id asignado 
    async save(obj) {
        try {
            let inventary = await fs.promises.readFile(`${this.fileName}`, 'utf-8')
            console.log(inventary)
            if (!inventary) {
                obj.id = 1
                const arrObjs = [obj]
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(arrObjs))
                return obj.id
            } else {
                inventary = JSON.parse(inventary);
                obj.id = inventary[inventary.length - 1].id + 1
                inventary.push(obj)
                await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(inventary))
                return obj.id
            }
        } catch (err) {
            console.log(`no se pudeo agregar el objeto por : ${err}`)
        }
    }
    // recibe un id y devuelve el objeto con ese id si no existe devolver null

    async getbyId(id) {
        try {
            const inventary = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(inventary)
            let objFind = dataParse.find(item => item.id == id)
            if (objFind) {
                return objFind
            } else {
                return { mensaje: "el producto no existe" }
            }
        } catch (err) {
            console.log(`hubo un error en recuperar el objeto por id : ${err}`)
        }
    }
    //modificar producto 
    async putById(id, newProduct) {
        try {
            const inventary = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(inventary)
            let objsFind = dataParse.filter((item) => item.id != id)
            newProduct.id = id
            objsFind.push(newProduct)
            await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(objsFind))
        } catch {
            console.log(`hubo un error al querer modificar el objeto por id : ${err}`)
        }
    }
    // devolver un array de objetos con todos los objetos que esten el archivo 
    async getAll() {
        try {
            const inventary = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let inventaryParse = JSON.parse(inventary)
            return inventaryParse
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }

    // borrar el elemento segun el id que le pasemos en el archivo 
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(data)
            let objsFind = dataParse.filter((item) => item.id != id)
            fs.promises.writeFile(`${this.fileName}`, JSON.stringify(objsFind))
            return { mensaje: "producto borrado" }
        } catch (err) {
            console.log(`hubo un error en recuperar el objeto por id : ${err}`)
        }

    }
    // elimina todos 
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.fileName}`, " ")
            return { msj: "contenido borrado" }
        } catch (err) {
            console.log(`hubo un error : ${err}`)
        }
    }

    async deleteProduct(id, id_prod) {
        try {
            const data = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let dataParse = JSON.parse(data)
            let cartFind = dataParse.find(item => item.id == id)
            cartFind.product = cartFind.product.filter((item) => item.id != id_prod)
            dataParse = [...dataParse, cartFind]
            await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(dataParse))
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


export { Contenedor }