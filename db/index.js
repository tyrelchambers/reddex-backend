const { Sequelize } = require("sequelize");

const environment = process.env.NODE_ENV || "development";
const config = require("./config");

module.exports = new Sequelize(config[environment]);
