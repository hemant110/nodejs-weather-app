const express = require("express");
const path = require("path");
const hbs = require("hbs");

const forecast = require("./forecast");
const geocode = require("./geocode");

const app = express();

//setup path for express config
const publicFolderPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and serve
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicFolderPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Hemant Nagpal",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Hemant Nagpal",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Hemant Nagpal",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Please provide the location to check weather.",
    });
  }
  
  geocode(req.query.location, (error, {latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast({ latitude, longitude }, (error, response2) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        loc: location,
        fore: `temperature is ${(response2.temperature - 32) * 5/9} but it feels like ${(response2.feelslike - 32) * 5/9}`,
        address: req.query.location
      })
    });
  });
});

app.get("/help/*", (req, res) => {
  res.send("Help article not found.");
});

app.get("*", (req, res) => {
  res.render("not-found", {
    title: "Not Found 404",
    name: "Hemant Nagpal",
  });
});

app.listen("3000", () => {
  console.log("server is up on port 3000");
});
