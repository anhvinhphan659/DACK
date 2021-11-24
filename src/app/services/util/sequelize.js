module.exports = {
    multipleSequelizeToObject: function(sequelizeArray){
        return sequelizeArray.map(sequelizeArray => sequelizeArray.toObject());
    },

    SequelizeToObject: function(sequelize){
        return sequelize ? sequelize.toObject(): sequelize;
    }
}