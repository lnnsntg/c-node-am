const request = require("request");
const access_key = "dca85bbebff529ec84e4103e1443dd1e"

const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=Madrid`;

request({ url: url, json: true }, (error, response) => {
  if(error){
    console.log('Unable to connect to weather service!');
    console.log('log de error: ', error);
  }else{
    const data = response.body.current;
    console.log(`Tiempo descripción: ${data.weather_descriptions[0]}`);
    console.log(`Temperatura actual: ${data.temperature}º grados centígrados`);
    console.log(`Sensación térmica: ${data.feelslike}º grados centígrados`);
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

/* const urlMapbox = "https://api.mapbox.com/geocoding/v5/mapbox.places/caracas.json?access_token=pk.eyJ1IjoibG5uc250ZyIsImEiOiJja3B5d3NjaWIwaDJsMndvNnFxbXl3NDY2In0.fpuG7ntzSau0DBVhguW1Hg"
request({url: urlMapbox, json: true}, (error, response) => {
  if(error){
    console.log(error);
  }else{
    const dataMapLat = response.body.features[0].center[1];
    const dataMapLon = response.body.features[0].center[0];
    console.log('LATITUD',dataMapLat);
    console.log('LONGITUD',dataMapLon);
  }
}) */

