const {models} = require("../../config/db")
const { Op } = require("sequelize");

module.exports = function findByType(type) {
  return models.sach.findAll({
    where: {
      masach:{
        [Op.like]: type + '%',
      }
    }
  });
}