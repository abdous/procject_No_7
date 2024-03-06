const dbConfig = require('../config/dbConfig.js')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log('connected to DB ...')
    })
    .catch(err => {
        console.log({ message: `Error + ${err}` })
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)
db.posts = require('./userPostModel.js')(sequelize, DataTypes)
db.comments = require('./comment.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then(() => {
        debugger
        console.log('yes connection to DB done!')
    })

module.exports = db