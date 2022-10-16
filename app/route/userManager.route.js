module.exports = app => {
    const userManager = require("../controller/userManager.controller");
    const router = require("express").Router();

    router.put("/:user_id", userManager.updateProfil);
    app.use("/plexus/web/updateprofil", router)
}