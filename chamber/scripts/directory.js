const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const cardSection = document.querySelector('#cont-cards');
const jsonData = './data/members.json';
const currentYear = document.querySelector('#currentYear');
const lastModified = document.querySelector('#lastModified');




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

getData();