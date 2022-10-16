const db = require("../model")
const UpdateProfil = db.updateProfil;

exports.updateProfil = async (req, res) => {
    const User_id = req.params.user_id;
    const Name = req.body.name;
    const Phone = req.body.phone;

    try {
        const data = await UpdateProfil.update(req.body, {
            where: {
                id: User_id
            }
        })

        if (!data) {
            res.status(404).send({
                success: false,
                message: "Account not found"
            })
            return
        }

        const data2 = await UpdateProfil.findOne({attributes: ['name', 'phone']},{
            where: {
                id: User_id
            }
        })

        if (!data2) {
            res.status(404).send({
                success: false,
                message: "Account not found"
            })
            return
        }

        res.status(200).send({
            success: true,
            message: "Success Update Profil",
            data: data2
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message || "server error"
        })
    }
}