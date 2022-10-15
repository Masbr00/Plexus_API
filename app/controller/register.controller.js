const db = require("../model");
const Register = db.register;


// Retrieve all Tutorials from the database.
exports.create = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const phone = req.body.phone;
    
    if (!name) {
        res.status(400).send({
            message: "Name cannot be empty"
        })
    } else if (!password) {
        res.status(400).send({
            message: "Password cannot be empty"
        })
    } else if (!phone) {
        res.status(400).send({
            message: "Phone cannot be empty"
        })
    } else if (!email) {
        res.status(400).send({
            message: "Email cannot be empty"
        })
    } else if (!username) {
        res.status(400).send({
            message: "Username cannot be empty"
        })
    }

    try {
        var data = await Register.create(req.body);
        res.status(200).send({
            status: true,
            message: "New Account Has Been Registered",
            data
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message || "server error"
            });
    }
};