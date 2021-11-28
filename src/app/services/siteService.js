const {
  models
} = require("../../config/db")
const {
  Op
} = require("sequelize");

//Tất cả sách
exports.AllBooks = () => {
  return models.sach.findAll();
}

//Lấy theo masach
exports.findById = (id) => {
  return models.sach.findOne({
    where: {
      masach: id,
    }
  });
}

//Lấy loại sách thao masach (Truyện chữ - truyện tranh)
exports.findByType = (type) => {
  return models.sach.findAll({
    where: {
      masach: {
        [Op.like]: type + '%',
      }
    }
  });
}



//Lấy sách theo thể loại 
exports.findByCategory = (category) => {
  return models.sach.findAll({
    include: [{
      model: models.theloaicuasach,
      as: "theloaicuasaches",
      include: [{
        model: models.theloai,
        as: 'maTL_theloai',
        where: {
          tênTL: {
            [Op.like]: '%' + category + '%',
          },
        },
      }],
      required: true,
    }],
  });
}


//Lấy sách theo tên
exports.findByTitle = (title) => {
  return models.sach.findAll({
    where: {
      tensach: {
        [Op.like]: '%' + title + '%',
      }
    }
  });
}

//Lấy thể loại sách
exports.listTheloai = () => {
  return models.theloai.findAll();
}