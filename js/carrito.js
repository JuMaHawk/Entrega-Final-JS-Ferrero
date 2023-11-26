import { productosOK } from "./main.js"

const listaCarrito = document.getElementById("items")

const footCarrito = document.getElementById("totales")

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]))

document.addEventListener("DOMContentLoaded", () => {
    renderCarrito()
})

let carrito = JSON.parse(sessionStorage.getItem("carrito"))

export const comprarProducto = (idProducto) => {

    const productoComprado = productosOK.find((item) => item.id === idProducto)

    const { id, modelo, precio, img } = productoComprado

    const productosEnCarrito = carrito.find((item) => item.id === idProducto)

    if (productosEnCarrito === undefined) {

        const newProductCarrito = {
            id: id,
            modelo: modelo,
            precio: precio,
            img: img,
            cantidad: 1
        }
        carrito.push(newProductCarrito)
        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    } else {
        const indexProductoCarrito = carrito.findIndex((item) => item.id === idProducto)

        carrito[indexProductoCarrito].cantidad++
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad
        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }
    carrito = JSON.parse(sessionStorage.getItem("carrito"))
    alert(`Usted compro el producto ${modelo}`)

}


const sumarPorducto = () => {

}

const restarPorducto = () => {

}

const renderCarrito = () => {

    carrito.forEach(productos => {

        const { id, modelo, precio, img, cantidad } = productos

        let tableBody = document.createElement("tr")

        tableBody.className = "productosCarrito"

        tableBody.innerHTML = `
        <th> <img id="fotoCarrito" src="${img}" class="card-img-top" </th>
        <td>${modelo}</td>
        <td>${cantidad}</td>
        <td>${precio / cantidad}</td>
        <td>${precio}</td>
        <button id="+${id}">+</button>
        <button id="-${id}">-</button>
        </td>
        `

        listaCarrito.append(tableBody)

        const btnAgregar = document.getElementById(`+${id}`)
        const btnRestar = document.getElementById(`-${id}`)

        btnAgregar.addEventListener("click", () => { console.log(id) })
        btnRestar.addEventListener("click", () => { console.log(id) })
    });

    dibujarFooter();
}
    const dibujarFooter = () => {
        if (carrito.length > 0) {
            footCarrito.innerHTML = ``;
            let footer = document.createElement("tr")
            footer.innerHTML = `
            <th>TOTALES</th>
            <td></td>
            <td>${generarTotales().cantidadTotal}</td>
            <td></td>
            <td>${generarTotales().costoTotal}</td>
            `
            footCarrito.append(footer)
        } else {
            footCarrito.innerHTML = `
            <h3>No hay productos en el carrito</h3>
            `
        }
    }

    const generarTotales = () => {
        const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
        const cantidadTotal = carrito.reduce((total, { cantidad }) => total + cantidad, 0)

        return {
            costoTotal: costoTotal,
            cantidadTotal: cantidadTotal
        }
    }