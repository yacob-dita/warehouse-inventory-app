const db = require('../db')

const { DataTypes, Model} = require('sequelize')

class Pallet extends Model {}

Pallet.init({ 
    
    capacity_of_pallet: DataTypes.INTEGER,  
   
  },
  {
    sequelize:db,
    timestamps: false,
  });

module.exports = Pallet;
