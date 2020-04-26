
const { Sequelize } = require('sequelize');

const environment = process.env.NODE_ENV || 'development'
import config from './config'

module.exports = new Sequelize(config[environment])