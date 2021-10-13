const Sequelize = require("sequelize");

const connection = new Sequelize('movies', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;