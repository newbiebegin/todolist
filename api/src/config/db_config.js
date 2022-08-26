require('dotenv').config();
console.log('---------------------');
console.log(process.env.MYSQL_HOST);
console.log('------------------');

module.exports = {
    HOST: process.env.MYSQL_HOST,
    PORT: process.env.MYSQL_PORT,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: process.env.MYSQL_DATABASE,
    dialect: 'mysql', //process.env.DB_DRIVER,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };