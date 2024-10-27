const urlParams = new URLSearchParams(window.location.search);
        
const firstName = urlParams.get('first-name');
const lastName = urlParams.get('last-name');
const email = urlParams.get('email');

const thankYouMessage = `Thank you, ${firstName} ${lastName}, for subscribing to our service!`;

document.getElementById('thankYouMessage').innerHTML = `
<p>${thankYouMessage}</p>
<p>We are glad to receive your register</p>
<p>Your contact data is:</p>
<p>Email: <span>${email}</span></p>
`;

const buttonMenu = document.querySelector('#menu-burguer');
const navMenu = document.querySelector('#container-logo-nav');


buttonMenu.addEventListener('click', function() {
    if (navMenu.classList.contains('container-logo-nav')) {
        navMenu.classList.remove('container-logo-nav');
        navMenu.classList.add('active');
    } else {
        navMenu.classList.remove('active');
        navMenu.classList.add('container-logo-nav');
    }
});

window.addEventListener('load', function() {
    const lastVisit = localStorage.getItem('lastVisit');
    const messageContainer = document.querySelector('#welcome-message');

    if (lastVisit) {
        const lastVisitDate = new Date(lastVisit);
        messageContainer.textContent = `Welcome back! Your last visit was on ${lastVisitDate.toLocaleString()}.`;
    } else {
        messageContainer.textContent = 'Welcome to our site for the first time!';
    }
    localStorage.setItem('lastVisit', new Date());
});
