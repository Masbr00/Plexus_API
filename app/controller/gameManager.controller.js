const { sequelize } = require("../model");
const db = require("../model")
const GameManager = db.inventory;
const Users = db.users;
const Listachievment = db.achievment;
const Detailachievment = db.detailachievment

exports.getAllUser = async (req, res) => {
    const user = Users.findAll({
        attributes: ["id", "name", "email", "phone"]
    })

    if (!user) {
        res.status(500).send({
            success: false,
            message: "Something wrong"
        })
    }
    res.status(200).send({
        success: true,
        message: "User data",
        data: user
    })
}

exports.subgamedata = async (req, res) => {
    const User_id = req.params.user_id;
    var Coin = req.body.coin || 0;
    var Silver = req.body.silver || 0;
    var Gold = req.body.gold || 0;
    var XP = req.body.xp || 0;

    if (isNaN(Coin) || isNaN(Silver) || isNaN(Gold) || isNaN(XP)) {
        res.status(500).send({
            success: false,
            message: "Only accept numeric input"
        })
    }

    if (!User_id) {
        res.status(500).send({
            success: false,
            message: "Please provide the user id"
        })
    }

    try {
        var data = await GameManager.findOne({
            where: {
                'player_id': User_id
            }
        });
        if (data) {
            var newCoin = parseInt(Coin) + parseInt(data.coin);
            var newSilver = parseInt(Silver) + parseInt(data.silver);
            var newGold = parseInt(Gold) + parseInt(data.gold);
            var newXP = parseInt(XP) + parseInt(data.xp);

            data = await GameManager.update({
                coin: newCoin,
                silver: newSilver,
                gold: newGold,
                xp: newXP
            },{
                where: {
                    'player_id': User_id
                }
            })

            var cekUang = await GameManager.findOne({
                where: {
                    'player_id': User_id
                }
            })
            if (cekUang) {
                if (cekUang.silver >= 100 && cekUang.silver < 200) {
                    var cekAchievment1 = await Listachievment.findOne({
                        where: {
                            'player_id': User_id,
                            'achievment_id': 1
                        }
                    })
                    if (!cekAchievment1) {
                        Listachievment.create({
                            'player_id': User_id,
                            'achievment_id': 1
                        })
                    }
                } 
                if (cekUang.silver >= 200 && cekUang.silver < 400) {
                    var cekAchievment2 = await Listachievment.findOne({
                        where: {
                            'player_id': User_id,
                            'achievment_id': 2
                        }
                    })
                    if (!cekAchievment2) {
                        await Listachievment.create({
                            'player_id': User_id,
                            'achievment_id': 2
                        })
                    }
                }
                if (cekUang.silver >= 400) {
                    var cekAchievment3 = await Listachievment.findOne({
                        where: {
                            'player_id': User_id,
                            'achievment_id': 3
                        }
                    })
                    if (!cekAchievment3) {
                        await Listachievment.create({
                            'player_id': User_id,
                            'achievment_id': 3
                        })
                    }
                }
                if (cekUang.gold >= 100) {
                    var cekAchievment4 = await Listachievment.findOne({
                        where: {
                            'player_id': User_id,
                            'achievment_id': 4
                        }
                    })
                    if (!cekAchievment4) {
                        await Listachievment.create({
                            'player_id': User_id,
                            'achievment_id': 4
                        })
                    }
                }
                if (cekUang.gold >= 200 && cekUang.gold < 400) {
                    var cekAchievment5 = await Listachievment.findOne({
                        where: {
                            'player_id': User_id,
                            'achievment_id': 5
                        }
                    })
                    if (!cekAchievment5) {
                        await Listachievment.create({
                            'player_id': User_id,
                            'achievment_id': 5
                        })
                    }
                }
                if (cekUang.gold >= 400) {
                    var cekAchievment6 = await Listachievment.findOne({
                        where: {
                            'player_id': User_id,
                            'achievment_id': 6
                        }
                    })
                    if (!cekAchievment6) {
                        await Listachievment.create({
                            'player_id': User_id,
                            'achievment_id': 6
                        })
                    }
                }
            }

            if (!data) {
                res.status(500).send({
                    success: false,
                    message: "Submit game data failed"
                })
            }
            res.status(200).send({
                success: true,
                message: "Submit game data success"
            })
        } else {
            res.status(500).send({
                success: false,
                message: "Game data not found"
            })
        }
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

exports.leaderboard = async (req, res) => {
    try {
        var leaderboard = await sequelize.query(`select tb_users.name, tb_inventories.player_id, tb_inventories.xp from tb_inventories, tb_users where tb_inventories.player_id = tb_users.id order by tb_inventories.xp ASC`)
        var leaderboardMap = leaderboard[0].map(item => {
            return {
                "name": item.name,
                "player_id": item.player_id,
                "xp": item.xp
            }
        })
        res.status(200).send({
            success: true,
            message: "Leaderboard",
            data: leaderboardMap
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
}

exports.playerAchievment = async (req, res) => {
    try {
        const User_id = req.params.user_id
        var achievment = await sequelize.query(`select tb_achievement.achievement, tb_achievement.detail from tb_achievement, tb_listachievmentusers where tb_achievement.id = tb_listachievmentusers.achievment_id and tb_listachievmentusers.player_id = ${User_id}`)
        var achievementMap = achievment[0].map(item => {
            return {
                "achievement": item.achievement,
                "detail": item.detail
            }
        })

        if (!achievment) {
            res.status(500).send({
                success: false,
                message: "Player doesn't have any achievement"
            })
        }

        res.status(200).send({
            success: true,
            message: "achievement",
            data: achievementMap
        })
    } catch (error) {
        res.status(404).send({
            success: false,
            message: error.message
        })
    }
}
