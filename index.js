const {sequelize, DataTypes, Model} = require('./db')
//import models
const { Pallet } = require('./models/pallet')
const { Warehouse } = require('./models/warehouse')
const { Box } = require('./models/box')

//associate models
Warehouse.hasMany(Pallet)
Pallet.belongsTo(Warehouse)
Pallet.hasMany(Box)
Box.belongsTo(Pallet)

//export models with added associations
module.exports = {Warehouse, Pallet, Box}
