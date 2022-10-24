const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

global.__basedir = __dirname;

app.use(fileUpload({
    createParentPath: true
}));
// app.use(express.static(path.join(__dirname, '/public/image/'))); //lokasi ketika berjalan di localhost
app.use(express.static(path.join(__dirname, 'var/task/app/controller/public/image/'))); //lokasi ketika berjalan di cloud

const db = require("./app/model");
db.sequelize.sync()
    .then(() => {
    console.log("Synced db.");
})
    .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

var corsOptions = {
    origin: "http://localhost:8081"
    };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require("./app/route/register.route")(app)
app.get('/', (request, response) => {
    response.json({ message: "Welcome, what are you buyin'" })
});

require("./app/route/register.route")(app);
require("./app/route/login.route")(app);
require("./app/route/userManager.route")(app);
require("./app/route/gameManager.route")(app);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

app.use((req,res) => {
    res.status(404).json({
        success: false,
        message: "Url Not Found",
    })
});

module.exports.port = port