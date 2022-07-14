class ContenedorProduct {
    constructor(config, nameTable , createTable) {
        this.config = config
        this.nameTable = nameTable
        this.createTable = createTable
    }
    async save(obj) {
        try {
            await this.config(this.nameTable).insert(obj)
            console.log("producto Cargado")
        } catch (err) {
            console.log(`no se pudeo agregar el objeto por : ${err}`)
        }
    }


    async getAll() {
        try {
            const data = await this.config.from(`${this.nameTable}`).select("*")
            return data
        } catch (err) {
            if (err.code == "ER_NO_SUCH_TABLE") {
                await this.createTable()
            } else{
             console.log(`hubo un error al recuperar la base ${this.nameTable} : ${err}`)}
        }
    }
}

module.exports = ContenedorProduct