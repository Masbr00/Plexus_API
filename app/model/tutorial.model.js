module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tb_users", {
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
        timestamps: false
    })
    return Tutorial;
};