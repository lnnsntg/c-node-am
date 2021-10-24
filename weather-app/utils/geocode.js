const request = require("request");

const access_token =
    "pk.eyJ1IjoibG5uc250ZyIsImEiOiJja3B5d3NjaWIwaDJsMndvNnFxbXl3NDY2In0.fpuG7ntzSau0DBVhguW1Hg";

const geocode = (address) => {
    const urlMapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ encodeURIComponent(address) }.json?access_token=${ access_token }`;

    request({ url: urlMapbox, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } 
        else if (response.body.features.length == 0) {
            callback('Data could not be retrieved for this location. Try another search', undefined)
        }
        else {
            const data = response.body.features[0];
            callback(undefined, data)
        }
    });
};

const callback = (error, data) => {
    if (error) {
        console.log(error);
    } 
    else {
        const place = data.place_name;
        const dataMapLat = data.center[1];
        const dataMapLon = data.center[0];
        console.log("Sitio de las coordenadas: ", place);
        console.log("LATITUD", dataMapLat);
        console.log("LONGITUD", dataMapLon);
    }
};

module.exports = {
    geocode
};
