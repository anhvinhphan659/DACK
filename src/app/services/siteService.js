const {
  models, sequelize
} = require("../../config/db")
const {
  Op, where
} = require("sequelize");

//Tất cả sách
exports.AllBooks = () => {
  return models.sach.findAll();
}

//Lấy theo masach - chi tiết sách
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
exports.findByCategory = async(category, sort) => {
  return models.sach.findAll({
    include: [{
      model: models.theloaicuasach,
      as: "theloaicuasaches",
      include: [{
        model: models.theloai,
        as: 'maTL_theloai',
        where: {
          tenTL: {
            [Op.like]: '%' + category + '%',
          },
        },
      }],
      required: true,
    }],
  });
}


//Lấy sách theo tên
exports.findByTitle = async(title,sort) => {
  if (sort == "1") {
    sort = "createdAt";
    return models.sach.findAll({
      where: {
        tensach: {
          [Op.like]: '%' + title + '%',
        },
      },
      order: [[sort, "DESC"]],
      raw: true,
    });
  } else if (sort == "2") {
    sort = "gia";
    return models.sach.findAll({
      where: {
        tensach: {
          [Op.like]: '%' + title + '%',
        },
      },
      order: [[sort, "DESC"]],
      raw: true,
    });
  } else if (sort == "3") {
    sort = "gia";
    return models.sach.findAll({
      where: {
        tensach: {
          [Op.like]: '%' + title + '%',
        },
      },
      order: [[sort, "ASC"]],
      raw: true,
    });
  } else if (sort == "4") {
    var h = await sequelize.query(
      "select sum(`ct_phieumua`.`SL`) as `hot`,`sach`.`masach`," +
        "`sach`.`tensach`, `sach`.`tacgia`, `sach`.`MOTA`, `sach`.`HINHANH`," +
        "`sach`.`manxb`, `sach`.`ngayXB`, `sach`.`gia`, `sach`.`SL`," +
        "`sach`.`createdAt`, `sach`.`updatedAt`, `sach`.`deletedAt`, `IDHINHANH`, LEFT(sach.masach,2)" +
        "from `sach` LEFT JOIN `ct_phieumua` ON `sach`.`masach` = `ct_phieumua`.`MASACH`" +
        "where `sach`.`deletedAt` IS NULL and `sach`.`tensach` LIKE '%" +
        title +
        "%'" +
        "group by `sach`.`masach`" +
        "order by `hot` DESC"
    );
    return h[0];
  } else {
    sort = "tensach";
  }
  return models.sach.findAll({
    where: {
        tensach: {
        [Op.like]: '%' + title + '%',
      },
    },
    order: [[sort, "ASC"]],
    raw: true,
  });
}

// Lấy sách mới nhất
exports.findNewBooks = (type) => {
  return models.sach.findAll({
    where: {
      masach: {
        [Op.like]: type + '%',
      }
    },
    order: [
      ['createdAt', 'DESC'],
    ],
    
    limit: 10,
  });
}

exports.findHotBooks = (type) => {
  return models.tonkho.findAll({
    include:[{
      model: models.sach,
      as: 'masach_sach',
      where: {
        masach: {
          [Op.like]: type+'%',
        }
      }
    }],

    order: [
      ['Tongxuat', "DESC"],
    ],

    limit: 10
  });
}

//Lấy thể loại sách
exports.listTheloai = () => {
  return models.theloai.findAll();
}
