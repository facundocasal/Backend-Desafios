class Usuario {
    constructor (nombre, apellido){
        this.nombre = nombre
        this.apellido = apellido 
        this.libros = []
        this.mascotas = []
    }
    getFullName (){
        return `${this.nombre} ${this.apellido}`
    }
    addMascotas(masc){
        this.mascotas.push(masc)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(libro , aut){
        this.libros.push({nombre: libro , autor: aut})
    }
    getBookNames(){
        const listaLibros = []
        this.libros.map(n=>listaLibros.push(n.nombre))
        return listaLibros
    }
}
// declaro el usuario 
const facundo = new Usuario("facundo", "casal")
// retorno el nombre del usuario
console.log(facundo.getFullName())
// agrego las mascotas del usuario
facundo.addMascotas("uma")
facundo.addMascotas("cereza")
// muestro la cantidad de mascotas que tiene el usuario 
console.log(facundo.countMascotas())
// agrego 2 libros al usuario 
facundo.addBook("el principito","Antoine de Saint-Exupéry")
facundo.addBook("cien años de soledad", "Gabriel Garcia Marquez")
// muestro la lista de los nombres de sus libros 
console.log(facundo.getBookNames())
