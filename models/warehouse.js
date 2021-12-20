const db = require('../db');
const { DataTypes, Model } = require('sequelize');
class Warehouse extends Model {}

Warehouse.init({
    name:{ 
         type:DataTypes.STRING,
          allowNull:false,
          unique:true
    },
    location: DataTypes.STRING, 
    capacity: DataTypes.INTEGER,   
    image: DataTypes.STRING   
}, {
    sequelize: db,
    timestamps: false,
});

module.exports = Warehouse;