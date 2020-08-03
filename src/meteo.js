import { secret } from '../secret.js'

let ville;
let options = {
    enableHighAccuracy : true
}

if("geolocation" in navigator) {
    navigator.geolocation.watchPosition((position) => {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${secret}&units=metric`
            let requete = new XMLHttpRequest();
            requete.open('GET', url);
            requete.responseType = 'json';
            requete.send();

            requete.onload = function() {
            if (requete.readyState === XMLHttpRequest.DONE) {
                if (requete.status === 200) {
                let reponse = requete.response;
                let selectVille = reponse.name
                let temperature = reponse.main.temp;
                document.querySelector('#ville').textContent = selectVille
                document.querySelector('#temperature_label').textContent = Math.round(temperature)
                } else {
                alert('Un problème est intervenu, merci de revenir plus tard.');
                }
            }
        }
    }, erreur, options);
} else {
    ville = 'Paris';
    recevoirTemperature(ville);
}

const button = document.querySelector('#changer')
button.addEventListener('click', () => {
    ville = prompt('Choisir une ville')
    recevoirTemperature(ville)
})

function erreur() {
    ville = 'Paris';
    recevoirTemperature(ville)
}

function recevoirTemperature() {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ville}&APPID=${secret}&units=metric`

        
        let requete = new XMLHttpRequest();
        requete.open('GET', url);
        requete.responseType = 'json';
        requete.send();

        requete.onload = function() {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
            let reponse = requete.response;
            let selectVille = reponse.name
            let temperature = reponse.main.temp;
            document.querySelector('#ville').textContent = selectVille
            document.querySelector('#temperature_label').textContent = Math.round(temperature)
            } else {
            alert('Un problème est intervenu, merci de revenir plus tard.');
            }
        }
    }
}

