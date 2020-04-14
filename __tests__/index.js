import {sequelize} from '../db/index'


(async() => {
  sequelize.sync()
})()
  