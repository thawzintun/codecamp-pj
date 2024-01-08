let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use("/public", express.static(__dirname + "/public"));
app.use("/json", function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));

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

app.route("/name")
    .get((req, res) => {
        const { first, last } = req.query;
        res.json({ name: `${first} ${last}` });
    })
    .post((req, res) => {
        const { first, last } = req.body;
        console.log(first, last);
        res.json({ name: `${first} ${last}` });
    });

module.exports = app;
