const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const _ = require("lodash");
const https = require("node:https")
app.use(express.static("public"))
app.set("view engine", "ejs");
const {log} = require("console");

//API KEY - 75a7405c19ea0994ec4e4b82b78e39a2
const url = "https://api.openweathermap.org/data/2.5/weather?lat=27.1300&lon=81.9300&appid=75a7405c19ea0994ec4e4b82b78e39a2";
app.get("/", (req, res) => {
    https.get(url, (res) => {
        res.on("data", (data) => {
            const weatherData = JSON.parse(data);
            log("StatusCode:", res.statusCode);
            log(weatherData);
        })
    })

})

app.listen(3000, () => {
    console.log("Server is up and running!");
})