const {models} = require("../../config/db")

module.exports = function findAll(){
    return models.sach.findAll({});
}
