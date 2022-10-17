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

db.register = require("./user.model")(sequelize, Sequelize);
db.login = require("./user.model")(sequelize, Sequelize);
db.updateProfil = require("./user.model")(sequelize, Sequelize);
db.updatePassword = require("./user.model")(sequelize, Sequelize);

module.exports = db;