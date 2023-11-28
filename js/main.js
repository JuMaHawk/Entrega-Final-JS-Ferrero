import { comprarProducto } from "./carrito.js";

export let productosOK = JSON.parse(localStorage.getItem("productosLS"))

const listado = document.getElementById("listado")

const inputBusqueda = document.getElementById("inputBusqueda")


const pedirStock = async () => {
    const resp = await fetch("./json/data.json")
    let data = await resp.json();
    localStorage.setItem("productosLS", JSON.stringify(data))
}
pedirStock()

const mostrarProductos = () => {

    productosOK.forEach(item => {
        
        const div = document.createElement("div")
        div.innerHTML = `    
        <div class="card col-lg-4 col-sm-12 mx-auto" style="width: 20rem;">
            <img src="${item.img}" class="card-img-top imgCard" alt="Foto catalogo de bicicleta Zenith Astra">
            <div class="card-body text-center">
                <h3 class="card-title">${item.modelo}</h3>
                <h5 class="card-title">$ ${item.precio}</h5>
                <p class="card-text">Hola</p>
                <button id="compra${item.id}" class="btn btn-secondary">Agregar al carrito</button>
            </div>
        </div>
        `
        listado.append(div)

        const botonComprar = document.getElementById(`compra${item.id}`)
        botonComprar.addEventListener("click", () => comprarProducto(item.id))
    })
}
mostrarProductos()


inputBusqueda.addEventListener("keyup", (e) => {
    const productosFiltrados = productosOK.filter((item) => item.modelo.toLowerCase().includes(e.target.value))
    console.log(productosFiltrados)
    productosOK = productosFiltrados
    if (e.target.value !== "") {
        listado.innerHTML = ``
        mostrarProductos(productosFiltrados)
    } else {
        listado.innerHTML = ``
        productosOK = JSON.parse(localStorage.getItem("productosLS"))
        mostrarProductos(productosOK)
    }
})
