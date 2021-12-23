const db = require('../db')

const { DataTypes, Model} = require('sequelize')

class Employee extends Model {}

Employee.init({ 
    
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
  },
  {
    sequelize:db,
    timestamps: false,
  });

module.exports = Employee;
