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

//API KEY - 75a7405c19ea0994ec4e4b82b78e39a2
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=27.1300&lon=81.9300&appid=75a7405c19ea0994ec4e4b82b78e39a2";
app.get("/", (req, res) => {
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const renderData = {
                icon : weatherData.weather[0].icon,
                main: weatherData.weather[0].main,
                temp: weatherData.main.temp,
            }
            res.render("index", renderData);
        })
    })

})

app.listen(3000, () => {
    console.log("Server is up and running!");
})