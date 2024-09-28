const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets);
    displayProphets(data.prophets); 
}
  
getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let dateBirth = document.createElement('p');
        let placeBirth = document.createElement('p');
        let portrait = document.createElement('img');

       
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dateBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
        placeBirth.textContent = `Place of Birth: ${prophet.birthplace}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.imageurl}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(dateBirth);
        card.appendChild(placeBirth);
        card.appendChild(portrait);

        cards.appendChild(card);

    });
}