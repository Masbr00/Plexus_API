const db = require("../model");
const Tutorials = db.tutorials;

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    try {
        var data = await Tutorials.findAll({attributes: ['name', 'email', 'phone']});
        res.status(200).send({
            status: true,
            message: "data found",
            data
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message || "server error"
            });
    }
};