const db = require("../model");
const Register = db.users;
const Inventory = db.inventory;

var bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
    const Name = req.body.name;
    const Email = req.body.email;
    const Username = req.body.username;
    const Password = req.body.password;
    const Phone = req.body.phone;
    
    if (!Name) {
        res.status(400).send({
            message: "Name cannot be empty"
        })
    } else if (!Password) {
        res.status(400).send({
            message: "Password cannot be empty"
        })
    } else if (!Phone) {
        res.status(400).send({
            message: "Phone cannot be empty"
        })
    } else if (!Email) {
        res.status(400).send({
            message: "Email cannot be empty"
        })
    } else if (!Username) {
        res.status(400).send({
            message: "Username cannot be empty"
        })
    }

    try {
        var data = await Register.create({
            name: Name,
            email: Email,
            username: Username,
            password: bcrypt.hashSync(Password, 8),
            phone: Phone
        });
        if (data) {
            var inventori = await Inventory.create({
                player_id: data.id,
                coin: 0,
                silver: 0,
                gold: 0,
                xp: 0
            })
        }
        res.status(200).send({
            status: true,
            message: "New Account Has Been Registered",
            name: data.name,
            player_id: data.id
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message || "server error"
            });
    }
};