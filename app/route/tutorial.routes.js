module.exports = app => {
    const tutorials = require("../controller/tutorial.controller");

    var router = require("express").Router();

    router.get("/tes", tutorials.findAll);

    app.use('/api/tutorials', router);
};