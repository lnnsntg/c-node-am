setTimeout(() => {
  console.log("Two seconds are up");
}, 2000);

const names = ["Andrew", "Jen", "Jess"];
const shortNames = names.filter((name) => {
  return name.length <= 4;
});

console.log(shortNames);

const geocode = (address, callback) => {
    setTimeout(() => {
        const data= {
            latitude: 0,
            longitude: 0
        }
        callback(data)
    }, 2000);
};

const back = (datos) => {
    console.log(datos);
}

geocode('Irlanda', back)
