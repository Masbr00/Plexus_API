const db = require("../model");
const Register = db.register;
const Op = db.Sequelize.Op;

checkDupeUserOrEmail = async (req, res, next) => {
    //username
    Register.findOne({
        where: {
            username: req.body.username
        }
    }).then(register => {
        if (register) {
            res.status(400).send({
                message: "Username already used!"
            });
            return;
        }

        //email
        Register.findOne({
            where: {
                email: req.body.email
            }
        }).then(register => {
            if (register) {
                res.status(400).send({
                    message: "Email already used!"
                });
                return;
            }

            next();
        });
    });
};

const verifySignUp = {
    checkDupeUserOrEmail: checkDupeUserOrEmail
};

module.exports = verifySignUp;