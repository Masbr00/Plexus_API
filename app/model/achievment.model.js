module.exports = (sequelize, Sequelize) => {
    const Achievment = sequelize.define("tb_achievement", {
        achievement: {
            type: Sequelize.TEXT
        },
        detail: {
            type: Sequelize.TEXT
        }
    },{
        timestamp: true
    })
    return Achievment;
};