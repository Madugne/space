//Creare la mappa e tiles
const mymap = L.map('map', { 'worldCopyJump': true }).setView([51.505, -0.09], 10); //con worldCopyJump evito che si ripeti il mondo all'infinito perdendo il nostro marker

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tile_Url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

const tiles = L.tileLayer(tile_Url, { attribution }); //attribution fra {} perchè si aspetta un oggetto
//con tile andiamo a riempire il div map con la mappa stessa attraverso openstreetmap

tiles.addTo(mymap);

//creare il marker con icona

var myIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/663/663010.png',
    iconSize: [30, 30],
    iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);



const api_Url = 'https://api.wheretheiss.at/v1/satellites/25544'

let firstTime = true

async function getStation() {
    const response = await fetch(api_Url);
    const data = await response.json(); //converti response in Json
    console.log(data.altitude)

    document.getElementById('alt').textContent = data.altitude.toFixed(2);
    document.getElementById('lat').textContent = data.latitude.toFixed(2);
    document.getElementById('long').textContent = data.longitude.toFixed(2);
    document.getElementById('vel').textContent = data.velocity.toFixed(2);

    marker.setLatLng([data.latitude, data.longitude]);
    if (firstTime) {
        mymap.setView([data.latitude, data.longitude], 5); //con setView faccio in modo di centrare la schermata sul marker appena refresho la pagina 
        firstTime = false;

    }

}

getStation();

setInterval(getStation, 1000) //ogni secondo richiamo la funzione e mi aggiorna i dati della stazione