module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("tb_users", {
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
        ,
        avatar: {
            type: Sequelize.STRING
        }
    },{
        timestamps: true
    })
    return User;
};