const socket = io()

// variables del formulario 
const nombreProduct = document.getElementById("nombreProduct")
const priceProduct = document.getElementById("priceProduct")
const imgProduct = document.getElementById("imgProduct")
const listaProductos = document.getElementById("listaProductos")
const cargarProducto = document.getElementById("cargarProducto")


// variables del chat

const userEmail  = document.getElementById("userEmail")
const userMensaje = document.getElementById("userMensaje")
const enviarMensaje = document.getElementById("enviarMensaje")
const chat = document.getElementById("chat")


function sendProduct (e) {
    e.preventDefault()
    let product = {
        name : nombreProduct.value,
        price : Number(priceProduct.value),
        img : imgProduct.value,
    }
    socket.emit("producto:cliente", product)    

    nombreProduct.value = " "
    priceProduct.value = " "
    imgProduct.value = " "
}

function sendMsj (e) {
        e.preventDefault()
        const msj = {
            author: {
                id: userEmail.value,
            },
            text: userMensaje.value
        }
        socket.emit("mensaje:cliente", msj)
        userEmail.value = " "
        userMensaje.value = " "

}

async function renderProducts(products) {
    const response = await fetch('./tabla.ejs')
    .then(res => res.text()).then(plantilla => {
        products.map(e => {
            const html = ejs.render(plantilla, e)
            listaProductos.innerHTML += html
        });
    }) 
}
function renderOptimization(optimization) {
    const optimizationContainer = document.querySelector(".optimization")
    optimizationContainer.innerHTML += `<b>${optimization}%</b>`;
}


function renderMessage(messageArray) {
    const html = messageArray.map(messageInfo => {
        return(`<div class="msgContainer">
        <span class="text-primary fw-bold">${messageInfo.user}</span>
        [<span class="text-danger">${messageInfo.tiempo}</span>] :
        <span class="text-success fst-italic">${messageInfo.mensaje}</span>
        </div>`)
    }).join(" ");
    chat.innerHTML = html;
    renderOptimization(messageArray.optimization)
}
function denormalizeMensajes(objMensajes) {
    const author = new normalizr.schema.Entity(
        "author"
    );

    const mensaje = new normalizr.schema.Entity(
        "mensaje",
        { author: author },
        { idAttribute: "_id" }
    );

    const schemaMensajes = new normalizr.schema.Entity(
        "mensajes",
        {
            mensajes: [mensaje],
        }
    );

    const denormalized = normalizr.denormalize(
        objMensajes.result,
        schemaMensajes,
        objMensajes.entities
    );


    const logitudNormalized = JSON.stringify(objMensajes).length;
    const longitudDenormalized = JSON.stringify(denormalized).length;
    const porcentajeOptimizacion = (100 - ((logitudNormalized * 100) / longitudDenormalized)).toFixed(2);

    const mensajesDenormalizados = denormalized.mensajes.map(mensaje => mensaje._doc)

    return { mensajesDenormalizados, porcentajeOptimizacion };
}

socket.on("server:itemsProduct-Msj", async items => {
    const { mensajesDenormalizados, porcentajeOptimizacion } = denormalizeMensajes(items.mensajes)
    items.mensajes = mensajesDenormalizados
    items.optimization = porcentajeOptimizacion;
    renderMessage(items);
    const mockData = await fetch("http://localhost:8080/api/productos-test")
    const mockProducts = await mockData.json()
    renderProducts(mockProducts)
})



socket.on('server:mensajes', infoMensaje =>{
    renderMessage(infoMensaje)
})

socket.on("producto:server", products => {
    renderProducts(products)
})

enviarMensaje.addEventListener("submit",sendMsj)
cargarProducto.addEventListener("submit",sendProduct)