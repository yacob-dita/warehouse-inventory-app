const db = require('../db');
const { DataTypes, Model } = require('sequelize');
class Warehouse extends Model {}

Warehouse.init({
    name:{ 
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    location:{
        type:DataTypes.STRING, 
        allowNull:false,
        unique:true
    },
    image: {
        type:DataTypes.STRING,  
        allowNull:false,
        unique:true
    },
    capacity:{
        type:DataTypes.INTEGER, 
        allowNull:false,
        unique:true}
        
}, {
    sequelize: db,
    timestamps: false,
});

module.exports = Warehouse;