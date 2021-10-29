const https = require('https');

// const access_key = "dca85bbebff529ec84e4103e1443dd1e";
// const urlBase = "http://api.weatherstack.com/current?access_key=";
//const url = `${ urlBase }${ access_key }&query=${ encodeURIComponent(address) }`;


const address = "Iceland";







const access_token = "pk.eyJ1IjoibG5uc250ZyIsImEiOiJja3B5d3NjaWIwaDJsMndvNnFxbXl3NDY2In0.fpuG7ntzSau0DBVhguW1Hg";
const urlBase = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const urlMapbox = `${ urlBase }${ encodeURIComponent(address) }.json?access_token=${ access_token }`;







const request = https.request(urlMapbox, (response) => {
    let data = "";
    response.on("data", (chunk) => {
        data = data + chunk.toString();
    })

    response.on("end", () => {
        const body = JSON.parse(data)
        console.log(body);

    })
})

request.end()