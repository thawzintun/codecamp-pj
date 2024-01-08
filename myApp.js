let express = require("express");
let app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use("/json", function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get(
    "/now",
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    },
    (req, res) => {
        res.json({ time: req.time });
    }
);
app.get("/json", function (req, res) {
    var helloMsg = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        helloMsg = "HELLO JSON";
    }
    res.json({ message: helloMsg });
});

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
        echo: word,
    });
});

module.exports = app;
