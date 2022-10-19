module.exports = app => {
    const gameManager = require("../controller/gameManager.controller");
    const router = require("express").Router();

    router.post("/player/:user_id", gameManager.subgamedata);
    router.get("/leaderboard", gameManager.leaderboard);

    app.use("/plexus/web/gamedata", router);
};