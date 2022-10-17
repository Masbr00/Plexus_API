module.exports = app => {
    const gameManager = require("../controller/gameManager.controller");
    const router = require("express").Router();

    router.post("/player/:user_id", gameManager.subgamedata);

    app.use("/plexus/web/gamedata", router);
};