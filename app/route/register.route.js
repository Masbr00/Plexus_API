module.exports = app => {
    const register = require("../controller/register.controller");
    const router = require("express").Router();
    const {verifySignUp} = require("../middleware")

    router.post("/", [
        verifySignUp.checkDupeUserOrEmail,
        verifySignUp.checkValidUserOrEmail
    ],
    register.create);

    app.use("/plexus/web/register", router);
};