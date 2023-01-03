// code for making a map and tiles. tiles are the pieces of the map put together to creat the image 
const map = L.map('map').setView([0, 0], 1.2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// this code changes the marker on the map to my preferd image. a png image
const map_icon = L.icon({
    iconUrl: 'icon.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});
//this code places a marker on the map at my prefered latitude and longitude. the longitude and latude is modified after my async function runs.
const marker = L.marker([0, 0], {icon: map_icon}).addTo(map);

// this function gets information from two apis. iss locationg and a weater api
async function retrieveData(){
    //getting information from ISS api and storing the latitude and longitude in variabls 
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    data = await response.json();
    longitude = data.longitude
    latitude = data.latitude
    speed = data.velocity
    marker.setLatLng([latitude, longitude])
    document.getElementById('long').textContent = longitude
    document.getElementById('lat').textContent = latitude
    document.getElementById('speed').textContent = speed


     //displaying the waether at the current location of the iss by using the variables from above
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=44990d996e170344d6f3fe66dd93260d&units=metric`);
    data2 = await weather.json();
    weather_info = data2.main
    feels_like = data2.main.feels_like
    humidity = data2.main.humidity
    pressure = data2.main.pressure
    temp = data2.main.temp
    temp_max = data2.main.temp_max
    temp_min = data2.main.temp_min


    
    //setting the text contents of the DOM elements
    document.getElementById('temp').textContent = temp
    document.getElementById('feel').textContent = longitude
    document.getElementById('humi').textContent = humidity
    document.getElementById('max').textContent = temp_max
    document.getElementById('min').textContent = temp_min
    document.getElementById('pres').textContent = pressure

};

retrieveData()

setInterval(retrieveData, 2000)



