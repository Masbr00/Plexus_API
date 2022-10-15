module.exports = (sequelize, Sequelize) => {
    const Register = sequelize.define("tb_users", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        }
    },{
        timestamps: true
    })
    return Register;
};