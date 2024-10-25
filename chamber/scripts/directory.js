const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const cardSection = document.querySelector('#cont-cards');
const jsonData = './data/members.json';
const currentYear = document.querySelector('#currentYear');
const lastModified = document.querySelector('#lastModified');

/* CONST FOR DISCOVER */

const url = 'https://calendarific.com/api/v2/holidays?api_key=OkAm1kK1MwjDCvFpc5rMb69rKBGi7CN2&country=US&year=2024';
const sidebar = document.querySelector('#sidebar');



let buttons = document.querySelectorAll('.page-button');

function activePage(event) {
    buttons.forEach(button => {
        button.classList.remove('menu-active');
    });

    event.target.classList.add('menu-active');
}

buttons.forEach(button => {
    button.addEventListener('click', activePage);
});

menu.addEventListener('click', function() {
    let navBar = document.querySelector('#navigation');
    navBar.classList.toggle('active');
});

currentYear.innerHTML = "©2024";
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

async function getData() {
    const response = await fetch(jsonData);
    const datas = await response.json();
    displayCards(datas); 
}

async function dataForUser (url) {
    const response = await fetch(url);
    const datas = await response.json();
    cardsForData(datas.response.holidays);
}

const displayCards = (datas) => {
    datas.forEach((data) => {
        let card = document.createElement('section');
        card.classList.add('cont-info-card');
        let contNameinfo = document.createElement('div');
        contNameinfo.classList.add('cont-name-info');

        let fullName = document.createElement('h2');
        let adress = document.createElement('p');

        let contImgData = document.createElement('div');
        contImgData.classList.add('cont-img-data');

        let contImg = document.createElement('div');
        let contData = document.createElement('div');
        contData.classList.add('cont-data-info');

        let email = document.createElement('p');
        let phone = document.createElement('p');
        let url = document.createElement('p');

        let portrait = document.createElement('img');
        portrait.setAttribute('src', 'https://via.assets.so/img.jpg?w=150&h=150&tc=#000000&bg=#BFD5D9');

       
        fullName.textContent = data.name;
        adress.textContent = data.address;
        email.innerHTML = `<span>EMAIL:</span> ${data.email}`;
        phone.innerHTML = `<span>PHONE:</span> ${data.phone_number}`;
        url.innerHTML = `<span>URL:<span/> ${data.website_url}`;

        contNameinfo.appendChild(fullName);
        contNameinfo.appendChild(adress);

        contImgData.appendChild(contImg);
        contImgData.appendChild(contData);

        contImg.appendChild(portrait);
        contData.appendChild(email);
        contData.appendChild(phone);
        contData.appendChild(url);

        card.appendChild(contNameinfo);
        card.appendChild(contImgData);
        cardSection.appendChild(card);

    });
}

const cardsForData = (datas) => {
    sidebar.innerHTML = '';

    datas.forEach((data => {
        let name = data.name;
        let date = data.date.iso;
        let description = data.description;
        let type = data.type[0];

        let contCard = document.createElement('div');
        contCard.classList.add('card-info');
        let elementTitle = document.createElement('h3');
        let elementDate = document.createElement('p');
        let elementDescription = document.createElement('p');
        let elementType = document.createElement('span');

        elementTitle.textContent = name;
        elementDate.textContent = date;
        elementDescription.textContent = description;
        elementType.textContent = type;

        contCard.appendChild(elementTitle);
        contCard.appendChild(elementDate);
        contCard.appendChild(elementDescription);
        contCard.appendChild(elementType);

        sidebar.appendChild(contCard);

    }));
}


const messageContainer = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = new Date();
localStorage.setItem('lastVisit', now);

function displayVisitMessage() {
    if (!lastVisit) {
        messageContainer.innerHTML = `<h2>Welcome! Let us know if you have any questions.</h2>`;
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = now - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference === 0) {
            messageContainer.innerHTML = `<h2>Back so soon! Awesome!</h2>`;
        } else if (daysDifference === 1) {
            messageContainer.innerHTML = `<h2>You last visited 1 day ago.</h2>`;
        } else {
            messageContainer.innerHTML = `<h2>You last visited ${daysDifference} days ago.</h2>`;
        }
    }
}


displayVisitMessage();
getData();
dataForUser(url);