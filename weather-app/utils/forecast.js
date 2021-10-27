const request = require("request");
const access_key = "dca85bbebff529ec84e4103e1443dd1e";
const urlBase = "http://api.weatherstack.com/current?access_key=";

function forecast(address) {
    const url = `${ urlBase }${ access_key }&query=${ encodeURIComponent(address) }`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (response.body === undefined) {
            callback(
                "Data could not be retrieved for weather in this location. Try another search",
                undefined
            );
        } else {
            const data = response.body;
            callback(undefined, data);
        }
    });

    const callback = (error, data) => {
        if (error) {
            console.log(error);
        } else {
            const {name, country, region} = data.location
            console.log(`Localidad para las coordenadas recibidas: ${name}, ${region}, ${country} `);
            console.log(`Tiempo descripción: ${ data.current.weather_descriptions[0] }`);
            console.log(
                `Temperatura actual: ${ data.current.temperature }º grados centígrados`
            );
            console.log(`Sensación térmica: ${ data.current.feelslike }º grados centígrados`);
        }
    };
}

module.exports = forecast;
