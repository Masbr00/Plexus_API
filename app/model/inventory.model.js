module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("tb_inventories", {
        player_id: {
            type: Sequelize.INTEGER
        },
        coin: {
            type: Sequelize.INTEGER
        },
        silver: {
            type: Sequelize.INTEGER
        },
        gold: {
            type: Sequelize.INTEGER
        },
        xp: {
            type: Sequelize.INTEGER
        }
    },{
        timestamps: true
    })
    return Inventory;
};