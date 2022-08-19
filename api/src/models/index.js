const dbConfig = require("../config/db_config.js");
const fs = require('fs');
const path = require('path');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
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

const models = __dirname ;

fs.readdirSync(models)
  .filter(function (file) {
    return (file.indexOf('.') !== 0)  && (file.slice(-3) === '.js')
  })
  .forEach(function (file) {
   
    if(file != 'index.js')
    {
        var model = require((path.join(models, file)))(sequelize, Sequelize);
        db[model.name] = model;
    }
  })

  Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  })

module.exports = db;