const db = require('../db')

const { DataTypes, Model} = require('sequelize')

class Pallet extends Model {}

Pallet.init({ 
    count_of_pallet: DataTypes.INTEGER,
    capacity_of_pallet: DataTypes.INTEGER,  
    type_of_pallet:DataTypes.STRING
  },
  {
    sequelize:db,
    timestamps: false,
  });

module.exports = Pallet;
