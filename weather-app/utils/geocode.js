const request = require("request");
const forecast = require("./forecast");

const access_token =
    "pk.eyJ1IjoibG5uc250ZyIsImEiOiJja3B5d3NjaWIwaDJsMndvNnFxbXl3NDY2In0.fpuG7ntzSau0DBVhguW1Hg";
    const urlBase = "https://api.mapbox.com/geocoding/v5/mapbox.places/"

const geocode = (address) => {
    const urlMapbox = `${urlBase}${ encodeURIComponent(address) }.json?access_token=${ access_token }`;

    request({ url: urlMapbox, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Coordinate data could not be retrieved at this location. Try another search', undefined)
        }
        else {
            const data = response.body.features[0];
            callback(undefined, data)
        }
    });
    const callback = (error, data) => {
        if (error) {
            console.log(error);
            return
        }
        else {
            console.log("Termino de la busqueda: ", address)
            console.log("Localización encontrada: ", data.place_name);
            console.log("Obteniendo coordenadas de sitio... ", );
            console.log("LATITUD", data.center[1]);
            console.log("LONGITUD", data.center[0]);
            const coordenadas = (`${data.center[1]},${data.center[0]}`)
            console.log("Enviando coordenadas a API weatherstack.com");
            forecast(coordenadas)
        }        
    };
};



module.exports = geocode;
