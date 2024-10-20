const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const cardSection = document.querySelector('#cont-cards');
const jsonData = './data/members.json';
const currentYear = document.querySelector('#currentYear');
const lastModified = document.querySelector('#lastModified');

let buttons = document.querySelectorAll('.page-button');

let sunrise = document.querySelector('#sunrise');
let sunset = document.querySelector('#sunset');

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

async function getDataWeather() {
    const apiWeather = 'https://api.openweathermap.org/data/2.5/forecast?lat=16.780449&lon=-3.011247&appid=f42b57a724a7cddd64943803c20f0f86&units=metric';
    const iconWeather = 'https://openweathermap.org/img/wn/';
    const weatherIconCont = document.querySelector('#weatherIcon');
    const textDescription = document.querySelector('#description');
    const spanCurrentTemp =document.querySelector('#currentTemp');
    const minTemp = document.querySelector('#minTemp');
    const maxTemp = document.querySelector('#maxTemp');
    const humidity = document.querySelector('#humidity');
    const today = document.querySelector('#today');
    const tomorrow = document.querySelector('#tomorrow');
    const dayAfterTomorrow = document.querySelector('#dayAfterTomorrow');

    const todayDate = new Date();
    const tomorrowDate = todayDate.getUTCDay()+1;
    const dayAfterTomorrowDate = todayDate.getUTCDay()+2;


    const dataWeatherToday = [];
    const dataWeatherTomorrow = [];
    const dataWeatherdayAfterTomorrow = [];
    

    try {
        const response = await fetch(apiWeather);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        let sunriseData = data.city.sunrise;
        let sunrise24 = convertTo24(sunriseData);
        sunrise.textContent = `Sunrise: ${sunrise24}`;

        let sunsetData = data.city.sunset;
        let sunset24 = convertTo24(sunsetData);
        sunset.textContent = `Sunset: ${sunset24}`;

        let iconCode = data.list[0].weather[0].icon;
        let weatherIcon = `${iconWeather}${iconCode}@2x.png`;
        let imgIcon = document.createElement('img');
        imgIcon.setAttribute('src', weatherIcon);
        imgIcon.setAttribute('alt', 'Icon for current weather');

        weatherIconCont.appendChild(imgIcon);

        let weatherDescription = data.list[0].weather[0].description;
        textDescription.textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

        let currentTempData = data.list[0].main.temp;
        spanCurrentTemp.textContent = `${currentTempData}°`;

        let minTempData = data.list[0].main.temp_min;
        minTemp.textContent = `Low: ${minTempData}°`;

        let maxTempData = data.list[0].main.temp_max;
        maxTemp.textContent = `High: ${maxTempData}°`;

        let humidityData = data.list[0].main.humidity;
        humidity.textContent = `Humidity: ${humidityData}%`;


        let arrayData = data.list;
        arrayData.forEach(element => {
            let date = element.dt_txt;
            let tempForDay = element.main.temp;
            dateFormat = new Date(date);

            if (dateFormat.getDay() === todayDate.getUTCDay()) {
                dataWeatherToday.push(tempForDay);
            } if (dateFormat.getDay() === tomorrowDate) {
                dataWeatherTomorrow.push(tempForDay);
            } if (dateFormat.getDay() === dayAfterTomorrowDate) {
                dataWeatherdayAfterTomorrow.push(tempForDay);
            }
        });

        today.innerHTML = `Today: <span>${dataWeatherToday[0]}°C</span>`;
        tomorrow.innerHTML = `${upcomingDays[0]}: <span>${dataWeatherTomorrow[0]}°C</span>`;
        dayAfterTomorrow.innerHTML = `${upcomingDays[1]}: <span>${dataWeatherdayAfterTomorrow[0]}°C</span>`;


    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }

}

async function getData() {
    const response = await fetch(jsonData);
    const datas = await response.json();
    displayCards(datas); 
}

const displayCards = (datas) => {
    const premiumCards = datas.filter(data => data.membership_level === "Gold" || data.membership_level === "Silver");
    

    const shuffledCards = premiumCards.sort(() => 0.5 - Math.random());
    const selectedCards = shuffledCards.slice(0, 3);

    selectedCards.forEach((data) => {
        let card = document.createElement('section');
        card.classList.add('cont-info-card');
        let contNameinfo = document.createElement('div');
        contNameinfo.classList.add('cont-name-info');

        let fullName = document.createElement('h2');
        let address = document.createElement('p');

        let contImgData = document.createElement('div');
        contImgData.classList.add('cont-img-data');

        let contImg = document.createElement('div');
        let contData = document.createElement('div');
        contData.classList.add('cont-data-info');

        let email = document.createElement('p');
        let phone = document.createElement('p');
        let url = document.createElement('p');

        let portrait = document.createElement('img');
        portrait.setAttribute('src', data.image_file_name);

        fullName.textContent = `${data.name} - ${data.membership_level}`;
        address.textContent = data.address;

        email.innerHTML = `<span>EMAIL:</span> ${data.email}`;
        phone.innerHTML = `<span>PHONE:</span> ${data.phone_number}`;
        url.innerHTML = `<span>URL:</span> ${data.website_url}`;

        contNameinfo.appendChild(fullName);
        contNameinfo.appendChild(address);

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


function convertTo24(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0'); 
    return `${hours}:${minutes}`;
}

function getNextTwoDays() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    
    const nextDays = [
        daysOfWeek[(today.getDay() + 1) % 7],
        daysOfWeek[(today.getDay() + 2) % 7]
    ];
    
    return nextDays;
}

const upcomingDays = getNextTwoDays();
getDataWeather();
getData();