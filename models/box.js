const {sequelize, DataTypes, Model} = require('../db')
class Box extends Model {

}
Box.init({
    box_count: DataTypes.INTEGER,
    staging_date: DataTypes.DATEONLY
}, {
    sequelize,
    timestamps: false
})

module.exports = {Box}
