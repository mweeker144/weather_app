(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fetch = require("node-fetch");
// const clientId = 'mBQGb6NKoSDfUtVEL1ukN'
// const weatherKey = 'rZ3eULU8H7EDFxUe82E3sAEch32vhbKzucWTXJt7';

// Weather Images
const sunnyImg = 'https://firebasestorage.googleapis.com/v0/b/final-project-js19.appspot.com/o/weatherImages%2Fday_clear.png?alt=media&token=99f13f01-23a5-4992-a8bc-12e66408bfee'
const mostlysunnyImg = 'https://firebasestorage.googleapis.com/v0/b/final-project-js19.appspot.com/o/weatherImages%2Fday_partial_cloud.png?alt=media&token=85aac00e-6895-4229-a652-c5d538afab1e'
const rainImg = 'https://firebasestorage.googleapis.com/v0/b/final-project-js19.appspot.com/o/weatherImages%2Frain.png?alt=media&token=d09d97ab-1631-4935-a597-ca4f9d7e7b45'
const lessRainImg = 'https://firebasestorage.googleapis.com/v0/b/final-project-js19.appspot.com/o/weatherImages%2Fday_rain.png?alt=media&token=dd56adaa-86e1-471c-86e5-dbccbd46c061'
const lightStorm = 'https://firebasestorage.googleapis.com/v0/b/final-project-js19.appspot.com/o/weatherImages%2Fday_rain.png?alt=media&token=dd56adaa-86e1-471c-86e5-dbccbd46c061'
const scatteredStorm = 'https://firebasestorage.googleapis.com/v0/b/final-project-js19.appspot.com/o/weatherImages%2Fday_rain_thunder.png?alt=media&token=39cc4521-fd06-447b-ac00-856016d4b99c'
// const sunnyImg = 


// Weather Cards DOM Elements
const cityNameText = document.querySelectorAll('.card-group.main .card h3');
const tempHighText = document.querySelectorAll('.card-group.main .card h2');
const tempLowText = document.querySelectorAll('.card-group.main .card h5');
const mainStatsText = document.querySelectorAll('#stats');
const weatherCards = document.querySelector('.card-group.main');
const summaryText = document.querySelectorAll('.card-group.main .card .card-footer.bg-info.text-center h6');
let weekDayText = document.querySelectorAll('.card-group.main .card .card-footer.bg-info.text-center extra-large');
const errorAlert = document.querySelector('#error-component');
const errorText = document.querySelector('#error-text');
const allImgs = document.querySelectorAll('img');
const allSums = document.querySelectorAll('#stats h6');


// Form DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Reveal Error
let errorUnhide = (text) =>{
    errorText.innerText = `${text}`
    errorAlert.classList.remove('d-none');
    searchInput.value = ''
}
// Hide Error
let errorHide = () =>{
    errorAlert.classList.add('d-none');
}

// Show Weather

let showWeather = () => {
    weatherCards.classList.remove('d-none')
}
// Hide Weather

let hideWeather = () => {
    weatherCards.classList.add('d-none')
}

// Search Functionality
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    let searchTerm = searchInput.value;
    
    if (searchTerm === '') {
        errorUnhide('Please enter a US zipcode');
    } else if (String(Number(searchTerm)) === 'NaN') {
        errorUnhide('Please enter a valid zipcode');
    } else if (typeof(Number(searchTerm)) === 'number' && searchTerm.length !== 5) {
        errorUnhide('Please enter a valid zipcode');
    } else { 
        errorHide();
        showWeather();
        fetch(`https://api.aerisapi.com/places/search?query=zipcode:${searchTerm}?&format=json&client_id=mBQGb6NKoSDfUtVEL1ukN&client_secret=rZ3eULU8H7EDFxUe82E3sAEch32vhbKzucWTXJt7`)
        .then(res => res.json())
        .then(data => {
            // if(data.error.code === 'warn_no_data'){
            //     errorUnhide('Zip code does not match our records, please try another.')
            //     hideWeather();
            // } else if (data.error.code === 'null') {
                for(i = 0; i < 7; i++){
                    cityNameText[i].textContent = data.response[0].place.name
                }
                // showWeather();
                
            
        
        });

        fetch(`https://api.aerisapi.com/forecasts/${searchTerm}?&format=json&filter=day&limit=7&client_id=mBQGb6NKoSDfUtVEL1ukN&client_secret=rZ3eULU8H7EDFxUe82E3sAEch32vhbKzucWTXJt7`)
        .then(res => res.json())
        .then(data => {
            console.log('here!');
            let weatherArr = [{}, {}, {}, {}, {}, {}, {} ];
            for(i = 0; i < weatherArr.length; i++) {
                weatherArr[i].maxTempF = data.response[0].periods[i].maxTempF
                weatherArr[i].minTempF = data.response[0].periods[i].minTempF
                weatherArr[i].avgHumidity = Math.round((data.response[0].periods[i].maxHumidity + data.response[0].periods[i].minHumidity) / 2)
                weatherArr[i].percentPrecip = data.response[0].periods[i].pop
                weatherArr[i].summary = data.response[0].periods[i].weatherPrimary
                weatherArr[i].windMph = data.response[0].periods[i].windSpeedMaxMPH
                weatherArr[i].dayOfWeek = new Date(data.response[0].periods[i].dateTimeISO).getDay();
                switch (weatherArr[i].dayOfWeek) {
                    case 0:
                        weatherArr[i].dayOfWeek = "Sunday";
                        break;
                    case 1:
                        weatherArr[i].dayOfWeek = "Monday";
                        break;
                    case 2:
                        weatherArr[i].dayOfWeek = "Tuesday";
                        break;
                    case 3:
                        weatherArr[i].dayOfWeek = "Wednesday";
                        break;
                    case 4:
                        weatherArr[i].dayOfWeek = "Thursday";
                        break;
                    case 5:
                        weatherArr[i].dayOfWeek = "Friday";
                        break;
                    case 6:
                        weatherArr[i].dayOfWeek = "Saturday";
                        break;
                }
        
            }
                for(i = 0; i < weatherArr.length; i++) {
                    tempHighText[i].innerText = weatherArr[i].maxTempF + '\u00B0'
                    tempLowText[i].innerText = weatherArr[i].minTempF + '\u00B0'
                    mainStatsText[i].innerHTML = `<div id="stats" class="card-body text-center">
                    <p class="card-text text-left .bg-secondary" ><b>Precip:</b> ${weatherArr[i].percentPrecip}%</p>
                    <p class="card-text text-left .bg-secondary" ><b>Humidity:</b> ${weatherArr[i].avgHumidity}%</p>
                    <p class="card-text text-left .bg-secondary" ><b>Wind:</b> ${weatherArr[i].windMph}mph</p>
                    <h6 class="card-text text-left text-dark-bold" ><b>${weatherArr[i].summary}</b></h6>
                    </div>`
                    // summaryText[i].innerText = weatherArr[i].summary
                    weekDayText[i].innerText = weatherArr[i].dayOfWeek
                    if(weatherArr[i].summary === 'Sunny'){
                        allImgs[i].src = sunnyImg
                    } else if (weatherArr[i].summary === 'Mostly Sunny') {
                        allImgs[i].src = mostlysunnyImg
                    } 
                    else if (weatherArr[i].summary === 'Partly Cloudy') {
                        allImgs[i].src = mostlysunnyImg
                    } 
                    else if (weatherArr[i].summary === 'Isolated Storms'){
                        allImgs[i].src = lightStorm
                    }
                    else if (weatherArr[i].summary === 'Scattered Storms'){
                        allImgs[i].src = scatteredStorm
                    }
                    else if (weatherArr[i].summary === 'Showers'){
                        allImgs[i].src = rainImg
                    }
                    else if (weatherArr[i].summary === 'Scattered Showers'){
                        allImgs[i].src = lessRainImg
                    }
                    else if (weatherArr[i].summary === 'Isolated Showers'){
                        allImgs[i].src = lessRainImg
                    }
                    
                }
            
                });
            }
    
});





},{"node-fetch":2}],2:[function(require,module,exports){
(function (global){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
exports.default = global.fetch.bind(global);

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
