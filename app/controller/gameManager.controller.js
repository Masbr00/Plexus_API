const db = require("../model")
const GameManager = db.inventory;
const Users = db.users;

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