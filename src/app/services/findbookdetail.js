const {  models } = require("../../config/db")

module.exports = function findById(id) {
  return models.sach.findOne({
    where: {
      masach: id,
    }
  });
}
