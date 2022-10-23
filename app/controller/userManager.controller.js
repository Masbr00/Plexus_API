const db = require("../model");
const UpdateProfil = db.users;
const UpdatePassword = db.users;
const portInfo = require("../../index");
const date = `${new Date().getDate()}${(new Date().getMonth() + 1)}${new Date().getFullYear()}`
const time = `${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`

var bcrypt = require("bcryptjs");
//ORIGINAL
// exports.updateProfil = async (req, res) => {
//     const User_id = req.params.user_id;
//     const Name = req.body.name;
//     const Phone = req.body.phone;

    // if (!Name) {
    //     res.status(500).send({
    //         success: false,
    //         message: "Name cannot be empty"
    //     })
    // }
    // if (!Phone) {
    //     res.status(500).send({
    //         success: false,
    //         message: "Phone cannot be empty"
    //     })
    // }

//     try {
        // const data = await UpdateProfil.findOne({
        //     where: {
        //         'id': User_id
        //     }
        // });
//         if (data) {
            // const data2 = await UpdateProfil.update({
            //     name: Name,
            //     phone: Phone
            // },{
            //     where: {
            //         'id': User_id
            //     }
            // })
            // if (!data2) {
            //     res.status(500).send({
            //         success: false,
            //         message: "Update Failed!"
            //     })
            // }
            // res.status(200).send({
            //     success: true,
            //     message: "Account Updated"
            // })
//         } else {
            // res.status(404).send({
            //     success: false,
            //     message: "Account Not Found"
            // })
//         }
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: error.message || "server error"
//         })
//     }
// }
exports.updateProfil = async (req, res) => {
    try {
        const User_id = req.params.user_id;
        const Name = req.body.name;
        const Phone = req.body.phone;
        var Avatar = req.files.avatar;
        const newName = Name.replace(/\s/g, '_')
        const fileName = `${date}-${time}-${newName}.jpg`;
        // const filePath = __dirname + "../../../public/image/" + `${fileName}`; //lokasi ketika run di localhost
        // const filePath = __dirname + "/public/image/" + `${fileName}`; //lokasi ketika run di cyclic
        const allowedExtension = ['image/png','image/jpg','image/jpeg'];

        const data = await UpdateProfil.findOne({
            where: {
                'id': User_id
            }
        });
        if(!allowedExtension.includes(Avatar.mimetype)){
            return res.status(422).send("Invalid Image");
        }
        // Avatar.mv(filePath, (err) => {
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     return res.send({ status: "success", path: path });
        // })
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
        if (data) {
            const data2 = await UpdateProfil.update({
                name: Name,
                phone: Phone,
                // avatar: `http://localhost:${portInfo.port}/${fileName}` // upload ketika run di localhost
                // avatar: `https://plexus-web.cyclic.app/${fileName}` // upload ketika run di cyclic
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
            const previewUpdated = await UpdateProfil.findOne({
                attributes: ['name', 'phone', 'avatar'],
                where: {
                    'id': User_id
                }
            })
            res.status(200).send({
                success: true,
                message: "Account Updated",
                data: previewUpdated
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