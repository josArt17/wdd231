const buttonMenu = document.querySelector('#menu-burguer');
const navMenu = document.querySelector('#container-logo-nav');
const inputSearch = document.querySelector('#title');


buttonMenu.addEventListener('click', function() {
    if (navMenu.classList.contains('container-logo-nav')) {
        navMenu.classList.remove('container-logo-nav');
        navMenu.classList.add('active');
    } else {
        navMenu.classList.remove('active');
        navMenu.classList.add('container-logo-nav');
    }
});