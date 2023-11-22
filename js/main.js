const listado = document.getElementById("listado")

const carrito =[];

const agregarCarrito = () => {
    const comprar = document.getElementById("comprar")
    comprar.addEventListener(click, ()=>{

    }) 
}

const mostrarListado = async () => {
    const resp = await fetch("/data.json")
    const data = await resp.json();

    data.forEach(item => {
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
    })
}
mostrarListado()
