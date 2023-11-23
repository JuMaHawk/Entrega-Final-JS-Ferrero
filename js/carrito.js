import { productosOK } from "./main.js"

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]))

let carrito = JSON.parse(sessionStorage.getItem("carrito"))

export const comprarProducto = (idProducto)=> {

    const productoComprado = productosOK.find((item) => item.id === idProducto)

    const {id, modelo, precio, img} = productoComprado

    const productosEnCarrito = carrito.find ((item) => item.id === idProducto)

    if(productosEnCarrito === undefined){

    const newProductCarrito = {
        id: id,
        modelo: modelo,
        precio: precio,
        img: img,
        cantidad: 1
    }
    carrito.push(newProductCarrito)
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }else{
        const indexProductoCarrito = carrito.findIndex((item)=> item.id === idProducto)

        carrito[indexProductoCarrito].cantidad++
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad
        sessionStorage.setItem("carrito",JSON.stringify(carrito))
        }
        carrito = JSON.parse(sessionStorage.getItem("carrito"))
        alert(`Usted compro el producto ${modelo}`)
        console.log(carrito)
}