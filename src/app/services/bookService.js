const { models, sequelize } = require("../../config/db");
const { Op, where } = require("sequelize");


exports.AllBooks = () => {
    return models.sach.findAll();
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
exports.findByType = (type) => {
    return models.sach.findAll({
        where: {
            masach: {
                [Op.like]: type + "%",
            },
        },
    });
};

//Lấy sách theo thể loại
exports.findByCategory = (category) => {
    return models.sach.findAll({
        include: [{
            model: models.theloaicuasach,
            as: "theloaicuasaches",
            include: [{
                model: models.theloai,
                as: "maTL_theloai",
                where: {
                    tenTL: {
                        [Op.like]: "%" + category + "%",
                    },
                },
            }, ],
            required: true,
        }, ],
    });
};

//Lấy sách theo tên
exports.findByTitle = (title) => {
    return models.sach.findAll({
        where: {
            tensach: {
                [Op.like]: "%" + title + "%",
            },
        },
    });
};

exports.updateQtyBook = async(bookid, qty) => {
    await models.sach.findOne({ masach: bookid }).then(function(obj) {
        if (obj) {
            const oldQty = obj.SL;
            models.dathang.update({ SL: oldQty - qty }, {
                where: {
                    masach: bookid,
                }
            });
        }
    })

}

//
exports.writecomment = async(req) => {
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
        " ORDER BY `binhluan`.`THOIGIAN` ASC")
};