module.exports = app => {
    const register = require("../controller/register.controller");
    const router = require("express").Router();

    router.post("/", register.create);

    app.use("/plexus/web/register", router);
};