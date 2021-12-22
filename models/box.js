
const db= require('../db')

const { DataTypes, Model} = require('sequelize')
class Box extends Model {}
Box.init({
   
    box_name: DataTypes.STRING
}, {
    sequelize:db,
    timestamps: false
})

module.exports = Box;
