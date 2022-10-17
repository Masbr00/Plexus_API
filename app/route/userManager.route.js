module.exports = app => {
    const userManager = require("../controller/userManager.controller");
    const router = require("express").Router();

    router.put("/profil/:user_id", userManager.updateProfil);
    router.put("/password/:user_id", userManager.updatePassword);
    app.use("/plexus/web/update", router)
}