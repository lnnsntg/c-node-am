const geocode = require("./utils/geocode");
const address = process.argv[2] || "Iceland"


geocode(address)
