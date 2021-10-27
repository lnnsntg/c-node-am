const geocode = require("./utils/geocode");
const address = process.argv[2] || "Islandia"


geocode(address)
