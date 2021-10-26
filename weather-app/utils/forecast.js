const request = require("request");
const access_key = "dca85bbebff529ec84e4103e1443dd1e";

function forecast(address) {
    const url = `http://api.weatherstack.com/current?access_key=${ access_key }&query=${ encodeURIComponent(
        address
    ) }`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (response.body.current === undefined) {
            callback(
                "Data could not be retrieved for this location. Try another search for time",
                undefined
            );
        } else {
            const data = response.body.current;
            callback(undefined, data);
        }
    });

    const callback = (error, data) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Tiempo descripción: ${ data.weather_descriptions[0] }`);
            console.log(
                `Temperatura actual: ${ data.temperature }º grados centígrados`
            );
            console.log(`Sensación térmica: ${ data.feelslike }º grados centígrados`);
        }
    };
}

module.exports = forecast;
