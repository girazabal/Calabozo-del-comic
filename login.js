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

//Prueba seteo de valores en local storage

/* localStorage.setItem('email',JSON.stringify(inputEmail.value));
JSON.parse(localStorage.getItem('email')); */ 




