const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const _ = require("lodash");
const https = require("node:https")
app.use(express.static("public"))
app.set("view engine", "ejs");
const { log } = require("console");

app.get("/", (req, res) => {
    res.render("home");
})

app.post("/", (req, res) => {
    const city = req.body.city;
    const country = req.body.country;
    const url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + country + "&appid=75a7405c19ea0994ec4e4b82b78e39a2";
    https.get(url, (response) => {
        response.on("data", (data) => {
            const geocoderData = JSON.parse(data);
            const lon = geocoderData[0].lon;
            const lat = geocoderData[0].lat;
            console.log(lon, lat);
            const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + lat + "&lon=" + lon + "&appid=75a7405c19ea0994ec4e4b82b78e39a2";
            https.get(weatherUrl, (response) => {
                response.on("data", (data) => {
                    const weatherData = JSON.parse(data);
                    const renderData = {
                        icon: weatherData.weather[0].icon,
                        main: weatherData.weather[0].main,
                        temp: weatherData.main.temp,
                    }
                    res.render("index", renderData);
                })
            })

        })
    })
})

app.listen(3000, () => {
    console.log("Server is up and running!");
})
