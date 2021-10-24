const access_key = "dca85bbebff529ec84e4103e1443dd1e";
const { geocode } = require('./utils/geocode');

const url = `http://api.weatherstack.com/current?access_key=${ access_key }&query=Madrid`;

request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to connect to weather service!');
    console.log('log de error: ', error);
  } else {
    const data = response.body.current;
    console.log(`Tiempo descripción: ${ data.weather_descriptions[0] }`);
    console.log(`Temperatura actual: ${ data.temperature }º grados centígrados`);
    console.log(`Sensación térmica: ${ data.feelslike }º grados centígrados`);
    console.log(response.body);
  }

});

//Current Weather API Endpoint
// http://api.weatherstack.com/current
//     ? access_key = YOUR_ACCESS_KEY
//     & query = New York
// optional parameters:
// & units = m
// & language = en
// & callback = MY_CALLBACK


geocode('gran via, madrid');


