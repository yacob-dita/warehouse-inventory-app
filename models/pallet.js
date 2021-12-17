const { sequelize, DataTypes, Model } = require("./db");

class Pallet extends Model {}

Pallet.init({ 
    count_of_pallet: DataTypes.INTEGER,
    capacity_of_pallet: DataTypes.INTEGER,  
    type_of_pallet:DataTypes.STRING
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = { Pallete };
