const db = require("../model");
const Register = db.users;
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneRegexp = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g;

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

checkValidUserOrEmail = async (req, res, next) => {
    //username
    if (!emailRegexp.test(req.body.email)) {
        res.status(400).send({
            message: "Email not valid"
        });
        return
    } else if (!phoneRegexp.test(req.body.phone)) {
        res.status(400).send({
            message: "Phone not valid"
        })
        return
    }
    next();
}

const verifySignUp = {
    checkDupeUserOrEmail: checkDupeUserOrEmail,
    checkValidUserOrEmail: checkValidUserOrEmail
};

module.exports = verifySignUp;