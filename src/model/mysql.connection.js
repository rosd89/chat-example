const sequelize = require('sequelize');
const {host, port, username, password, database, logging} = require('../../config/db.config.json');

const db = new sequelize(database, username, password, {
    host, port, logging
});

module.exports = db;