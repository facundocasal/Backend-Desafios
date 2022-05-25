class Usuario {
    constructor (nombre, apellido){
        this.nombre = nombre
        this.apellido = apellido 
        this.libros = []
        this.mascotas = []
    }
    getFullName (){
        console.log(`el nombre del usuario es ${this.nombre} ${this.apellido}`)
    }
    addMascotas(masc){
        this.mascotas.push(masc)
    }
    countMascotas(){
        console.log(`el usuario tiene ${this.mascotas.length} mascotas`)
    }
    addBook(libro , aut){
        this.libros.push({nombre: libro , autor: aut})
    }
    getBookNames(){
        console.log(`los libros del usuario son :`)
        const listaLibros = []
        this.libros.map(n=>listaLibros.push(n.nombre))
        console.log(listaLibros)
    }
}
// declaro el usuario 
const facundo = new Usuario("facundo", "casal")
// retorno el nombre del usuario
facundo.getFullName()
// agrego las mascotas del usuario
facundo.addMascotas("uma")
facundo.addMascotas("cereza")
// muestro la cantidad de mascotas que tiene el usuario 
facundo.countMascotas()
// agrego 2 libros al usuario 
facundo.addBook("el principito","Antoine de Saint-Exupéry")
facundo.addBook("cien años de soledad", "Gabriel Garcia Marquez")
// muestro la lista de los nombres de sus libros 
facundo.getBookNames()