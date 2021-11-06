const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { runInNewContext } = require("vm");
const app = express();
const PORT = 3000;

//Define path for Express config
const publicDirectoryPaht = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPaht));

//------------------------------------------------------------------------

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      Please: "You most provide an address",
    });
  } else {
    res.send({
      address: req.query.address,
    });
  }
});

//------------------------------------------------------------------------

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

//------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Lenin Santiago",
  });
});

//------------------------------------------------------------------------

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
    name: "Lenin Santiago",
  });
});

//------------------------------------------------------------------------

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Lenin Santiago",
  });
});

//------------------------------------------------------------------------

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Lenin Santiago",
  });
});

//------------------------------------------------------------------------

app.listen(PORT || 3000, () => {
  console.log(`Server running! at port ${ PORT }`);
});
