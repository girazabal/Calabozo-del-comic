// const Swal = require('sweetalert2')

//Interactuar con HTML
const contenedor = document.getElementById('comic-contenedor')

comics.forEach(comic => {
    const article = document.createElement('article');
    article.classList.add('buy-card');
    article.classList.add(comic.className);
    article.innerHTML += `
                        <article class="buy-card">
                            <h5 class="title">${comic.titulo}</h5>
                            <p class="price">$${comic.precio}</p>
                            <button type="button" class="btn btn-primary btn-sm" id= boton${comic.id}>Comprar</button>
                        </article>
    `;
    contenedor.appendChild(article);
    const boton = document.getElementById(`boton${comic.id}`)
    boton.addEventListener('click', () => {
        addToLocalStorage('carrito', comic);
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
        })
    })
});


const juguetesContenedor = document.getElementById('juguetes-contenedor');

juguetes.forEach(juguete => {
    const article = document.createElement('article');
    article.classList.add('buy-card');
    article.classList.add(juguete.className);
    article.innerHTML += `
                        <article class="buy-card">
                                    <h5 class="title">${juguete.titulo}</h5>
                                    <p class="price">${juguete.precio}</p>
                                    <button type="button" class="btn btn-primary btn-sm" id= boton${juguete.id}>Comprar</button>
                                </article>
                        `;
    juguetesContenedor.appendChild(article);
    const boton = document.getElementById(`boton${juguete.id}`);

    boton.addEventListener('click', () => {
        addToLocalStorage('carrito', juguete);
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
        })
    })
});



const obtenerCarrito = () => {
    //Hay que traer los que esten en el carrito
    let productosEnCarrito = localStorage.getItem('carrito');
    let arrayCarrito = JSON.parse(productosEnCarrito) || [];
    let textoComics = '';
    arrayCarrito.forEach(producto => {
        textoComics = textoComics + ' ' + '<p>' + producto.titulo + '    $' + producto.precio + '</p>';
    });
    return textoComics;
}

//Recibe la key carrito y un producto a guardar en el
const addToLocalStorage = (key, producto) => {
    //trae lo que hay en el carrito
    let arrayCarritoJson = localStorage.getItem(key); //devueleve null cuando no existe
    //lo convierte en objeto
    let arrayCarrito = JSON.parse(arrayCarritoJson) || [];
    //lo agrega al array
    arrayCarrito.push(producto);
    //lo vuelve a hacer un JSON
    arrayCarritoJson = JSON.stringify(arrayCarrito);
    //lo setea en el localStorage
    localStorage.setItem(key, arrayCarritoJson);
}


const carrito = document.getElementById('carrito-contenedor');
carrito.addEventListener('click', () => {
    Swal.fire({
        icon: 'success',
        title: 'Este es tu carrito',
        html: obtenerCarrito(),
        confirmButtonText: "Confirmar compra",
        denyButtonText: "Eliminar",
    })
})


