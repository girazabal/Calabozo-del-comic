//Interactuar con HTML
const obtenerComics = async () => {
    try {
        const response = await fetch('https://girazabal.github.io/Calabozo-del-comic/pages/nuestros-productos.html');
//        const response = await fetch('/stockComics.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error ', error)
    }
}
const mostrarComics = async () =>{

const contenedor = document.getElementById('comic-contenedor');

const comics = await obtenerComics();


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
            title:'<h2 class="swal-title">Producto agregado al carrito</h2>',
            background: '#242320',
            iconColor: '#deb928',
            confirmButtonColor: '#deb928',
        });
        addToLocalStorage('carrito', comic);
        precioFinal();
    })
});
}

mostrarComics();
obtenerComics();

const obtenerJuguetes = async () => {
    try {
        const response = await fetch('/stockJuguetes.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error ', error)
    }
}

const mostrarJuguetes = async () =>{
const juguetesContenedor = document.getElementById('juguetes-contenedor');

const juguetes = await obtenerJuguetes();

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
        Swal.fire({
            icon: 'success',
            title: '<h2 class="swal-title">Producto agregado al carrito</h2>',
            background: '#242320',
            iconColor: '#deb928',
            confirmButtonColor: '#deb928',
        });
        addToLocalStorage('carrito', juguete);
        precioFinal();
    })
});
}

mostrarJuguetes();
obtenerJuguetes();

const obtenerRemeras = async () => {
    try {
        const response = await fetch('/stockRemeras.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error ', error)
    }
}

const mostrarRemeras = async () =>{

const remerasContenedor = document.getElementById('remeras-contenedor');

const remeras = await obtenerRemeras();

remeras.forEach(remera => {
    const article = document.createElement('article');
    article.classList.add('buy-card');
    article.classList.add(remera.className);
    article.innerHTML += `
                        <article class="buy-card">
                                    <h5 class="title">${remera.titulo}</h5>
                                    <p class="price">${remera.precio}</p>
                                    <button type="button" class="btn btn-primary btn-sm" id= boton${remera.id}>Comprar</button>
                                </article>
                        `;
    remerasContenedor.appendChild(article);
    const boton = document.getElementById(`boton${remera.id}`);

    boton.addEventListener('click', () => {
        Swal.fire({
            icon: 'success',
            title: '<h2 class="swal-title">Producto agregado al carrito</h2>',
            background: '#242320',
            iconColor: '#deb928',
            confirmButtonColor: '#deb928',
        });
        addToLocalStorage('carrito', remera);
        precioFinal();
    })
});
}

mostrarRemeras();

const obtenerCarrito = () => {
    //Hay que traer los que esten en el carrito
    let productosEnCarrito = localStorage.getItem('carrito');
    let arrayCarrito = JSON.parse(productosEnCarrito) || [];
    arrayCarrito.length === 0 && console.log('El carrito se encuentra vacio');
    let textoComics = '';
    arrayCarrito.forEach(producto => {
        textoComics = textoComics + ' ' + '<p>' + producto.titulo + ' -    $' + producto.precio + ' - Unid.: ' + producto.cantidad + '</p>';
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
    arrayProducto = validarProductoRepetido(producto, arrayCarrito);
    //lo vuelve a hacer un JSON
    arrayCarritoJson = JSON.stringify(arrayCarrito);
    //lo setea en el localStorage
    localStorage.setItem(key, arrayCarritoJson);
}


    const validarProductoRepetido = (productoNuevo, arrayCarrito) => {
        let indice = arrayCarrito.findIndex((prod) => prod.id === productoNuevo.id);
        console.log(indice);
        if(indice !== -1) {
            console.log('Producto repetido');
            arrayCarrito[indice].cantidad++
            console.log(arrayCarrito[indice]);
        }
        else{
            console.log('Producto nuevo');
            arrayCarrito.push(productoNuevo);
        }
        return arrayCarrito;
    }

    const precioFinal = () => {
        const productosEnCarrito = localStorage.getItem('carrito');
        const arrayCarrito = JSON.parse(productosEnCarrito) || [];
        arrayCarritoJson = JSON.stringify(arrayCarrito);
        const total = arrayCarrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
        console.log(total)
        return total;
    };

    // const mostrarTotal = () => {
        
    // }

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
            title: `<h2 class"swal-title">El precio final de su compra es de $ ${precioFinal() } </h2>`,
            timer: 5000,
            position: 'top-end',
            background: '#242320',
            iconColor: '#deb928',
            confirmButtonColor: '#deb928',
//            text: precioFinal()
        }).then((result) => {
            if(result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: '<h2 class"swal-title">Su compra ha sido realizada con exito</h2>',
                    timer: 5000,
                    position: 'top-end',
                    background: '#242320',
                    iconColor: '#deb928',
                    confirmButtonColor: '#deb928',
                })
            }
        })
        localStorage.clear();
    }
    })
    }
)






