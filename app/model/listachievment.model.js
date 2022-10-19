module.exports = (sequelize, Sequelize) => {
    const Achievment = sequelize.define("tb_listachievmentusers", {
        player_id: {
            type: Sequelize.INTEGER
        },
        achievment_id: {
            type: Sequelize.INTEGER
        }
    },{
        timestamp: true
    })
    return Achievment;
};