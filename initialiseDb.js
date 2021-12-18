const db = require('./db')
//import models
const Pallet  = require('./models/pallet')
const  Warehouse  = require('./models/warehouse')
const  Box  = require('./models/box')

//associate models
async function initialiseDb() {
Warehouse.hasMany(Pallet)
Pallet.belongsTo(Warehouse)
Pallet.hasMany(Box)
Box.belongsTo(Pallet)
await db.sync();
}
//export models with added associations
//module.exports = {Warehouse, Pallet, Box}
module.exports = initialiseDb;






