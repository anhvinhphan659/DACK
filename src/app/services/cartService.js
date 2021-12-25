const { models, sequelize } = require("../../config/db");
const { Op } = require("sequelize");
const sach = require("../models/sach");


exports.findCurrentCartByUser = async(id_user) => {
    return await sequelize.query(
        "SELECT * FROM `dathang` AS `dathang` INNER JOIN `sach` as `sachs` " +
        "ON `dathang`.`masach`=`sachs`.`masach` " +
        "WHERE `dathang`.`TRANGTHAI`='DANGDAT' AND `dathang`.`makh`= '" + id_user + "'"
    )
}

exports.addNewBookToCart = async(currentID, bookID, customerID) => {
    await models.dathang.create({
        iddathang: currentID,
        masach: bookID,
        makh: customerID,
        TRANGTHAI: 'DANGDAT',
        SOLUONG: 1,
        THOIGIAN: new Date(),
    })
}

exports.generateIDDatHang = (userID) => {

    return "DH" + String(userID) + String(parseInt((new Date().getTime() / 1000)));
}


exports.payCart = (id_dh) => {
    models.dathang.update({ TRANGTHAI: "DADAT" }, {
        where: {
            iddathang: id_dh,
        }
    })
}