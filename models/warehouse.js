const db = require('../db');
const { DataTypes, Model } = require('sequelize');
class Warehouse extends Model {}

Warehouse.init({
    // name: DataTypes.STRING,   
    
    // location:DataTypes.STRING,      
    
    // image:DataTypes.STRING,        
    
    // capacity:DataTypes.INTEGER      

    name:{ 
        type:DataTypes.STRING,
        
        unique:true
    },
    location:{
        type:DataTypes.STRING, 
       
        unique:true
    },
    image: {
        type:DataTypes.STRING,  
        
        unique:false
    },
    capacity:{
        type:DataTypes.INTEGER, 
        
        unique:true}
        
}, {
    sequelize: db,
    timestamps: false,
});

module.exports = Warehouse;