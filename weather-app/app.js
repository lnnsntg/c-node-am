const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')


function both(address) {
  forecast(address)
  geocode(address);
}



both("madridaljpfhaphfphpfg")

