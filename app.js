//Interactuar con HTML
/* const contenedor = document.getElementById('comic-contenedor')


comics.forEach(comic=>{
    const article = document.createElement('article');
    article.classList.add('buy-card');
    article.classList.add(comic.className)
    article.innerHTML += `
                        <article class="buy-card">
                            <h5 class="title">${comic.titulo}</h5>
                            <p class="price">$${comic.precio}</p>
                            <button  type="button" class="btn btn-primary btn-sm">Comprar</button>
                        </article>
    `;
    contenedor.appendChild(article);
})
 */
//Incorporar eventos

const form = document.getElementById('form');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;

    console.log(email, password);
})