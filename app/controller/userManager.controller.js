const db = require("../model")
const UpdateProfil = db.users;
const UpdatePassword = db.users;

var bcrypt = require("bcryptjs");

exports.updateProfil = async (req, res) => {
    const User_id = req.params.user_id;
    const Name = req.body.name;
    const Phone = req.body.phone;

    if (!Name) {
        res.status(500).send({
            success: false,
            message: "Name cannot be empty"
        })
    }
    if (!Phone) {
        res.status(500).send({
            success: false,
            message: "Phone cannot be empty"
        })
    }

    try {
        const data = await UpdateProfil.findOne({
            where: {
                'id': User_id
            }
        });
        if (data) {
            const data2 = await UpdateProfil.update({
                name: Name,
                phone: Phone
            },{
                where: {
                    'id': User_id
                }
            })
            if (!data2) {
                res.status(500).send({
                    success: false,
                    message: "Update Failed!"
                })
            }
            res.status(200).send({
                success: true,
                message: "Account Updated"
            })
        } else {
            res.status(404).send({
                success: false,
                message: "Account Not Found"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || "server error"
        })
    }
}

exports.updatePassword = async (req, res) => {
    const User_id = req.params.user_id;
    const Old_password = req.body.old_password
    const New_password = bcrypt.hashSync((req.body.new_password), 8);

    if (!Old_password) {
        res.status(500).send({
            success: false,
            message: "Old Password cannot be empty"
        })
    }
    if (!New_password) {
        res.status(500).send({
            success: false,
            message: "New Password cannot be empty"
        })
    }

    try {
        const data = await UpdatePassword.findOne({
            where: {
                'id': User_id
            }
        });

        if (data) {
            var checkPassword = bcrypt.compareSync(
                Old_password, data.password
            );
            if (checkPassword) {
                const data2 = await UpdatePassword.update({
                    password: New_password
                },{
                    where: {
                        'id': User_id
                    }
                })
                
                res.status(200).send({
                    success: true,
                    message: "Password Updated!"
                })
            } else{
                res.status(500).send({
                    success: false,
                    message: "Invalid Password"
                })
            }
        } else if (!data) {
            res.status(404).send({
                success: false,
                message: "Account not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || "server error"
        })
    }
}