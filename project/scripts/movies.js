const buttonMenu = document.querySelector('#menu-burguer');
const navMenu = document.querySelector('#container-logo-nav');
const inputSearch = document.querySelector('#title');
const url = 'https://api.themoviedb.org/3/movie/popular';
const containerData = document.querySelector('#container-data');

const descriptionSeries = [];

inputSearch-addEventListener('keyup', function(){
    let url = 'https://api.themoviedb.org/3/search/movie';
    renderInputData(url, inputSearch.value);
});

buttonMenu.addEventListener('click', function() {
    if (navMenu.classList.contains('container-logo-nav')) {
        navMenu.classList.remove('container-logo-nav');
        navMenu.classList.add('active');
    } else {
        navMenu.classList.remove('active');
        navMenu.classList.add('container-logo-nav');
    }
});

const renderData = async (url) => {
    containerData.innerHTML = '';
    try {
        const datas = await seriesData(url);
        datas.results.forEach(data => {
            let id = data.id;
            let description = data.overview;

            let objectData = {};
            objectData[id] = description;

            descriptionSeries.push(objectData);
            
            let containerInfo = document.createElement('div');
            let imgSerie = document.createElement('img');
            let contTitleDetails = document.createElement('div');
            let titleSerie = document.createElement('h2');
            let detailsButton = document.createElement('button');

            containerInfo.classList.add('container-info');
            contTitleDetails.classList.add('cont-title-details');

            let linkImg = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
            let sourceImg = data.poster_path;

            imgSerie.setAttribute('src', `${linkImg}${sourceImg}`);
            imgSerie.setAttribute('loading', 'lazy');

            titleSerie.textContent = data.title;

            detailsButton.textContent = 'Details';
            detailsButton.setAttribute('id', id);
            detailsButton.classList.add('details-button');

            containerInfo.appendChild(imgSerie);
            containerInfo.appendChild(contTitleDetails);
            contTitleDetails.appendChild(titleSerie);
            contTitleDetails.appendChild(detailsButton);
            containerData.appendChild(containerInfo);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    let detailButton = document.querySelectorAll('.details-button');
    detailButton.forEach(button => {
        button.addEventListener('click', function() {
            let idSerie = this.id;
            let serie = descriptionSeries.find(item => Object.keys(item)[0] === idSerie);
            if (serie) {
                let overview = serie[idSerie];
                showModal(overview);
            } else {
                console.log('Nothing to show');
            }
        });
    });
}

const renderInputData = async (url, value) => {
    containerData.innerHTML = '';
    try {
        const datas = await inputData(url, value);
        datas.results.forEach(data => {
            let id = data.id;
            let description = data.overview;

            let objectData = {};
            objectData[id] = description;

            descriptionSeries.push(objectData);
            
            let containerInfo = document.createElement('div');
            let imgSerie = document.createElement('img');
            let contTitleDetails = document.createElement('div');
            let titleSerie = document.createElement('h2');
            let detailsButton = document.createElement('button');

            containerInfo.classList.add('container-info');
            contTitleDetails.classList.add('cont-title-details');

            let linkImg = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
            let sourceImg = data.poster_path;

            imgSerie.setAttribute('src', `${linkImg}${sourceImg}`);
            imgSerie.setAttribute('loading', 'lazy');

            titleSerie.textContent = data.title;

            detailsButton.textContent = 'Details';
            detailsButton.setAttribute('id', id);
            detailsButton.classList.add('details-button');

            containerInfo.appendChild(imgSerie);
            containerInfo.appendChild(contTitleDetails);
            contTitleDetails.appendChild(titleSerie);
            contTitleDetails.appendChild(detailsButton);
            containerData.appendChild(containerInfo);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    let detailButton = document.querySelectorAll('.details-button');
    detailButton.forEach(button => {
        button.addEventListener('click', function() {
            let idSerie = this.id;
            let serie = descriptionSeries.find(item => Object.keys(item)[0] === idSerie);
            if (serie) {
                let overview = serie[idSerie];
                showModal(overview);
            } else {
                console.log('Nothing to show');
            }
        });
    });
}

async function seriesData(url) {
    let apiKey = '3dc8f0362bbb5fa504fe926785068df2';
    const response = await fetch(`${url}?api_key=${apiKey}`);
    const datas = await response.json();
    return datas;
}

async function inputData(url, value) {
    let apiKey = '3dc8f0362bbb5fa504fe926785068df2';
    const response = await fetch(`${url}?query=${value}&api_key=${apiKey}`);
    const datas = await response.json();
    return datas;
}

const showModal = (value) => {
    const serieModal = document.querySelector('#serie-details'); 

    serieModal.innerHTML = '';

    let containerButtonClose = document.createElement('div');
    containerButtonClose.classList.add('containerButtonClose');

    let buttonClose = document.createElement('button');
    buttonClose.textContent = 'X';
    buttonClose.setAttribute('id', 'close-modal');

    let detailSerie = document.createElement('p');
    detailSerie.textContent = value;


    containerButtonClose.appendChild(buttonClose);
    serieModal.appendChild(containerButtonClose);
    serieModal.appendChild(detailSerie);

    if (typeof serieModal.showModal === 'function') {
        serieModal.showModal();
    } else {
        serieModal.style.display = 'block';
    }

    buttonClose.addEventListener('click', function() {
        if (typeof serieModal.close === 'function') {
            serieModal.close();
        } else {
            serieModal.style.display = 'none';
        }
    });
}

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

renderData(url);