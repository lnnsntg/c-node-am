const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs")
const port = 3000;

//Define paht for Express config
const publicDirectoryPaht = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

//Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPaht));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Lenin Santiago",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Acerca de mi",
    name: "Lenin Santiago",
  });
});

//------------------------------------------------------------------------

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    helpText: "Aqui va el texto del parrafó de ayuda",
  });
});

//------------------------------------------------------------------------

app.get("/weather", (req, res) => {
  res.send([
    {
      name: "Philadephia",
    },
    {
      country: "United States",
    },
  ]);
});

app.listen(port || 3000, () => {
  console.log(`Server running! at port ${ port }`);
});
