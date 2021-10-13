const Sequelize = require("sequelize");
const connection = require("./database");

const Filmes = connection.define('filmes', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false  
    }, 
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imdb: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Filmes.sync({force: true}).then(() => {});

module.exports = Filmes;