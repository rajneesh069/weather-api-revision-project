const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const _ = require("lodash");
const https = require("node:https")
app.use(express.static("public"))
app.set("view engine", "ejs");

//API KEY - 75a7405c19ea0994ec4e4b82b78e39a2

app.get("/", (req, res) => {
    const data = {
        check : "Check",
    }
    res.render("index", data);
})

app.listen(3000, () => {
    console.log("Server is up and running!");
})