const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.achievment = require("./listachievment.model")(sequelize, Sequelize);
db.detailachievment = require("./achievment.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.inventory = require("./inventory.model")(sequelize, Sequelize);

module.exports = db;