module.exports = app => {
    const gameManager = require("../controller/gameManager.controller");
    const router = require("express").Router();

    router.get("/player", gameManager.getAllUser);
    router.post("/player/:user_id", gameManager.subgamedata);
    router.get("/leaderboard", gameManager.leaderboard);
    router.get("/achievment/:user_id", gameManager.playerAchievment);
    router.get("/achievment", gameManager.AllplayerAchievment);

    app.use("/plexus/web/gamedata", router);
};