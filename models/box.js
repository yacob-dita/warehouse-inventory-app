
const db= require('../db')

const { DataTypes, Model} = require('sequelize')
class Box extends Model {}
Box.init({
    box_count: DataTypes.INTEGER,
    staging_date: DataTypes.DATEONLY
}, {
    sequelize:db,
    timestamps: false
})

module.exports = Box;
