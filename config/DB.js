const Sequelize = require('sequelize');

const db = new Sequelize('perpust','root','', {
    host:"localhost",
    dialect:"mysql"
});

module.exports = db;
