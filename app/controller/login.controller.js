const db = require("../model");
const Login = db.users;
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    useEmail = req.body.useEmail;
    const User = req.body.user;
    const Password = req.body.password;

    if (!User) {
        res.status(400).send({
            message: "Username or Email cannot be empty"
        })
    } else if (!Password) {
        res.status(400).send({
            message: "Password cannot be empty"
        })
    }

    try {
        if (useEmail) {
            var data = await Login.findOne({
                where: {
                    email : User
                }
            })
        } else {
            var data = await Login.findOne({
                where: {
                    username: User
                }
            })
        }

        if (!data) {
            res.status(404).send({
                status: false,
                message: "Account not Found."
            });
        }

        var checkPassword = bcrypt.compareSync(
            Password, data.password
        );
        if (!checkPassword) {
            res.status(404).send({
                status: false,
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({id: data.username}, config.secret, {
            expiresIn: 86400 //24 jam
        });

        res.status(200).send({
            message: "Welcome",
            name: data.name,
            accessToken: token
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message || "server error"
            });
    }
};