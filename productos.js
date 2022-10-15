// const Swal = require('sweetalert2')

//Interactuar con HTML
const contenedor = document.getElementById('comic-contenedor');


comics.forEach(comic => {
    const article = document.createElement('article');
    article.classList.add('buy-card');
    article.classList.add(comic.className);
    article.innerHTML += `
                        <article class="buy-card">
                            <h5 class="title">${comic.titulo}</h5>
                            <p class="price">$${comic.precio}</p>
                            <button type="button" class="btn btn-primary btn-sm" id=${comic.id}>Comprar</button>
                        </article>
    `;
    contenedor.appendChild(article);
    const boton = document.getElementById(`${comic.id}`)
    boton.addEventListener('click', () => {
        Swal.fire({
            icon: 'success',
            title: '<h2 class="swal-title">Producto agregado al carrito</h2>',
            background: '#242320',
            iconColor: '#deb928',
            confirmButtonColor: '#deb928',
        });
        addToLocalStorage('carrito',comic);
        precioFinal();
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
            title: '<h2 class="swal-title">Producto agregado al carrito</h2>',
            background: '#242320',
            iconColor: '#deb928',
            confirmButtonColor: '#deb928',
        })
    })
});


const obtenerCarrito = () => {
    //Hay que traer los que esten en el carrito
    let productosEnCarrito = localStorage.getItem('carrito');
    let arrayCarrito = JSON.parse(productosEnCarrito) || [];
    let textoComics = '';
    arrayCarrito.forEach(producto => {
        textoComics = textoComics + ' ' + '<p>' + producto.titulo + ' -    $' + producto.precio + ' - Unid.: '+producto.cantidad +'</p>';
    });
    return textoComics;
}


//Recibe la key carrito y un producto a guardar en el
function addToLocalStorage(key, producto) {
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

const precioFinal = ()=>{
    const productosEnCarrito = localStorage.getItem('carrito');
    const arrayCarrito = JSON.parse(productosEnCarrito)|| [];
    arrayCarritoJson = JSON.stringify(arrayCarrito);
    const total = arrayCarrito.reduce((acc, comic) => acc + comic.precio, 0);
    console.log(total);
};

// const validarComicRepetido = (comicId)=>{
//     const productosEnCarrito = localStorage.getItem('carrito');
//     const arrayCarrito = JSON.parse(productosEnCarrito) || [];
//     arrayCarritoJson = JSON.stringify(arrayCarrito);
//     const comicRepetido = arrayCarrito.some(comic => comic.id == comicId);
//     if(comicRepetido){
//         comicRepetido.cantidad++;
//         console.log(comicsRepetidos);
//     }else{
//         arrayCarrito.push(comicId);
//     }
// };


const carrito = document.getElementById('carrito-contenedor');
carrito.addEventListener('click', () => {
    Swal.fire({
        title: '<h2 class="swal-title">Este es tu carrito</h2>',
        html: obtenerCarrito(),
        showDenyButton: true,
        showCancelButton: true,
        position: 'top-end',
        background: '#242320',
        confirmButtonColor: '#deb928',
        confirmButtonText: 'Continuar comprando',
        denyButtonText: `Finalizar compra`,
    }).then((result) => {
    if (result.isConfirmed) {
    } else if (result.isDenied) {
        Swal.fire({
            icon: 'success',
            title: '<h2 class"swal-title">Su compra ha sido realizada con exito</h2>',
            timer: 5000,
            position: 'top-end',
            background: '#242320',
            iconColor: '#deb928',
            confirmButtonColor: '#deb928',
        })
        localStorage.clear();
    }
    })
    }
)






