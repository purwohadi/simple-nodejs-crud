const sequelize = require("sequelize")
const db = require("../config/db")

const User = db.define(
    'user',
    {
        username: {type: sequelize.STRING},
        email: {type: sequelize.STRING},
        password: {type: sequelize.STRING},
    },
    {
        freezeTableName : true
    }
);

module.exports = User