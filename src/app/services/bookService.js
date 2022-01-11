const { models, sequelize } = require("../../config/db");
const { Op, where } = require("sequelize");

exports.AllBooks = async (sort) => {
  //return models.sach.findAll();
  if (sort == "1") {
    sort = "createdAt";
    return models.sach.findAll({
      order: [[sort, "DESC"]],
      raw: true,
    });
  } else if (sort == "2") {
    sort = "gia";
    return models.sach.findAll({
      order: [[sort, "DESC"]],
      raw: true,
    });
  } else if (sort == "3") {
    sort = "gia";
    return models.sach.findAll({
      order: [[sort, "ASC"]],
      raw: true,
    });
  } else if (sort == "4") {
    var h = await sequelize.query(
      "select sum(`ct_phieumua`.`SL`) as `hot`,`sach`.`masach`," +
        "`sach`.`tensach`, `sach`.`tacgia`, `sach`.`MOTA`, `sach`.`HINHANH`," +
        "`sach`.`manxb`, `sach`.`ngayXB`, `sach`.`gia`, `sach`.`SL`, " +
        "`sach`.`createdAt`, `sach`.`updatedAt`, `sach`.`deletedAt`, `IDHINHANH` " +
        "from `sach` LEFT JOIN `ct_phieumua` ON `sach`.`masach` = `ct_phieumua`.`MASACH` " +
        "where `sach`.`deletedAt` IS NULL " +
        "group by `sach`.`masach`" +
        "order by `hot` DESC"
    );
    return h[0];
  } else {
    sort = "tensach";
  }
  return models.sach.findAll({
    order: [[sort, "ASC"]],
    raw: true,
  });
};

//Lấy theo masach - chi tiết sách
exports.findById = (id) => {
  return models.sach.findOne({
    where: {
      masach: id,
    },
  });
};

//Lấy loại sách thao masach (Truyện chữ - truyện tranh)
exports.findByType = async (type, sort) => {
  if (sort == "1") {
    sort = "createdAt";
    return models.sach.findAll({
      where: {
        masach: {
          [Op.like]: type + "%",
        },
      },
      order: [[sort, "DESC"]],
      raw: true,
    });
  } else if (sort == "2") {
    sort = "gia";
    return models.sach.findAll({
      where: {
        masach: {
          [Op.like]: type + "%",
        },
      },
      order: [[sort, "DESC"]],
      raw: true,
    });
  } else if (sort == "3") {
    sort = "gia";
    return models.sach.findAll({
      where: {
        masach: {
          [Op.like]: type + "%",
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
        "where `sach`.`deletedAt` IS NULL and LEFT(sach.masach,2) = '" +
        type +
        "'" +
        "group by `sach`.`masach`" +
        "order by `hot` DESC"
    );
    return h[0];
  } else {
    sort = "tensach";
  }
  return models.sach.findAll({
    where: {
      masach: {
        [Op.like]: type + "%",
      },
    },
    order: [[sort, "ASC"]],
    raw: true,
  });
};

//Lấy sách theo thể loại
exports.findByCategory = async(category, sort) => {
  if (sort == "1") {
    sort = "createdAt";
    var h = await sequelize.query(
        "select sum(`ct_phieumua`.`SL`) as `hot`,`sach`.`masach`,"+
        "`sach`.`tensach`, `sach`.`tacgia`, `sach`.`MOTA`, `sach`.`HINHANH`,"+
        "`sach`.`manxb`, `sach`.`ngayXB`, `sach`.`gia`, `sach`.`SL`,"+
        "`sach`.`createdAt`, `sach`.`updatedAt`, `sach`.`deletedAt`, `IDHINHANH`"+
        "from  theloaicuasach tlcs,theloai tl , `sach` LEFT JOIN `ct_phieumua` ON `sach`.`masach` = `ct_phieumua`.`MASACH`"+
        "where `sach`.`deletedAt` IS NULL and tlcs.masach = sach.masach and tlcs.maTL = tl.maTL and tl.tenTL = '"+category+"'"+
        "group by `sach`.`masach`"+
        "order by `"+ sort +"` DESC"
    );
    return h[0];
  } else if (sort == "2") {
    sort = "gia";
    var h = await sequelize.query(
        "select sum(`ct_phieumua`.`SL`) as `hot`,`sach`.`masach`,"+
        "`sach`.`tensach`, `sach`.`tacgia`, `sach`.`MOTA`, `sach`.`HINHANH`,"+
        "`sach`.`manxb`, `sach`.`ngayXB`, `sach`.`gia`, `sach`.`SL`,"+
        "`sach`.`createdAt`, `sach`.`updatedAt`, `sach`.`deletedAt`, `IDHINHANH`"+
        "from  theloaicuasach tlcs,theloai tl , `sach` LEFT JOIN `ct_phieumua` ON `sach`.`masach` = `ct_phieumua`.`MASACH`"+
        "where `sach`.`deletedAt` IS NULL and tlcs.masach = sach.masach and tlcs.maTL = tl.maTL and tl.tenTL = '"+category+"'"+
        "group by `sach`.`masach`"+
        "order by `"+ sort +"` DESC"
    );
    return h[0];
  } else if (sort == "3") {
    sort = "gia";
    
    var h = await sequelize.query(
        "select sum(`ct_phieumua`.`SL`) as `hot`,`sach`.`masach`,"+
        "`sach`.`tensach`, `sach`.`tacgia`, `sach`.`MOTA`, `sach`.`HINHANH`,"+
        "`sach`.`manxb`, `sach`.`ngayXB`, `sach`.`gia`, `sach`.`SL`,"+
        "`sach`.`createdAt`, `sach`.`updatedAt`, `sach`.`deletedAt`, `IDHINHANH`"+
        "from  theloaicuasach tlcs,theloai tl , `sach` LEFT JOIN `ct_phieumua` ON `sach`.`masach` = `ct_phieumua`.`MASACH`"+
        "where `sach`.`deletedAt` IS NULL and tlcs.masach = sach.masach and tlcs.maTL = tl.maTL and tl.tenTL = '"+category+"'"+
        "group by `sach`.`masach`"+
        "order by `"+ sort +"` ASC"
    );
    return h[0];
  } else if (sort == "4") {
    
    var h = await sequelize.query(
        "select sum(`ct_phieumua`.`SL`) as `hot`,`sach`.`masach`,"+
        "`sach`.`tensach`, `sach`.`tacgia`, `sach`.`MOTA`, `sach`.`HINHANH`,"+
        "`sach`.`manxb`, `sach`.`ngayXB`, `sach`.`gia`, `sach`.`SL`,"+
        "`sach`.`createdAt`, `sach`.`updatedAt`, `sach`.`deletedAt`, `IDHINHANH`"+
        "from  theloaicuasach tlcs,theloai tl , `sach` LEFT JOIN `ct_phieumua` ON `sach`.`masach` = `ct_phieumua`.`MASACH`"+
        "where `sach`.`deletedAt` IS NULL and tlcs.masach = sach.masach and tlcs.maTL = tl.maTL and tl.tenTL = '"+category+"'"+
        "group by `sach`.`masach`"+
        "order by `hot` DESC"
    );
    return h[0];
  } else {
    sort = "tensach";
    
  }
    var h = await sequelize.query(
        "select sum(`ct_phieumua`.`SL`) as `hot`,`sach`.`masach`,"+
        "`sach`.`tensach`, `sach`.`tacgia`, `sach`.`MOTA`, `sach`.`HINHANH`,"+
        "`sach`.`manxb`, `sach`.`ngayXB`, `sach`.`gia`, `sach`.`SL`,"+
        "`sach`.`createdAt`, `sach`.`updatedAt`, `sach`.`deletedAt`, `IDHINHANH`"+
        "from  theloaicuasach tlcs,theloai tl , `sach` LEFT JOIN `ct_phieumua` ON `sach`.`masach` = `ct_phieumua`.`MASACH`"+
        "where `sach`.`deletedAt` IS NULL and tlcs.masach = sach.masach and tlcs.maTL = tl.maTL and tl.tenTL = '"+category+"'"+
        "group by `sach`.`masach`"+
        "order by `"+ sort +"` ASC"
    );
    return h[0];
};



exports.updateQtyBook = async (bookid, qty) => {

  const book = await models.sach.findOne({
    masach: bookid,
  });
  if (book) {
    const newQty = book.SL - qty;

    models.sach.update({ SL: newQty }, { where: { masach: bookid } });
  }
};

//
exports.writecomment = async (req) => {
  return await models.binhluan.create({
    USER: req.body.USER,
    MASACH: req.params.id,
    NOIDUNG: req.body.NOIDUNG,
    THOIGIAN: new Date(Date.now()).toISOString(),
  });
};
//lấy bình luận của 1 sách
exports.getcomment = async(req) => {
    return await sequelize.query("SELECT `binhluan`.`USER`, `binhluan`.`MASACH`, `binhluan`.`THOIGIAN`, `binhluan`.`NOIDUNG`, `USER_khachhang`.`MAKH`, `USER_khachhang`.`USER` , `USER_khachhang`.`HOTEN` , " +
        " `USER_khachhang`.`HINHANH`,  `USER_khachhang`.`IDHINHANH`  " +
        "  FROM `binhluan` AS `binhluan` LEFT OUTER JOIN `khachhang` AS `USER_khachhang` ON `binhluan`.`USER` = `USER_khachhang`.`USER` AND (`USER_khachhang`.`deletedAt` IS NULL) WHERE `binhluan`.`MASACH` =  '" + req.params.id + "'" +
        " ORDER BY `binhluan`.`THOIGIAN` DESC")
};
