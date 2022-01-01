const { models, sequelize } = require("../../config/db");
const { Op } = require("sequelize");
const sach = require("../models/sach");

exports.getAllCartByUser = async(userID) => {
    return await sequelize.query("SELECT * FROM `dathang` AS `dathang` INNER JOIN `sach` as `sachs` " +
        "ON `dathang`.`masach`=`sachs`.`masach` " +
        "WHERE `dathang`.`TRANGTHAI`='DADAT' AND `dathang`.`makh`= '" + userID + "'");
}

exports.findCurrentCartByUser = async(id_user) => {
    return await sequelize.query(
        "SELECT * FROM `dathang` AS `dathang` INNER JOIN `sach` as `sachs` " +
        "ON `dathang`.`masach`=`sachs`.`masach` " +
        "WHERE `dathang`.`TRANGTHAI`='DANGDAT' AND `dathang`.`makh`= '" + id_user + "'"
    )
}

exports.addNewBookToCart = async(currentID, bookID, customerID) => {
    await models.dathang.findOne({
        where: {
            iddathang: currentID,
            masach: bookID,
            makh: customerID,
        }
    }).then(function(obj) {
        if (!obj) {
            return models.dathang.create({
                iddathang: currentID,
                masach: bookID,
                makh: customerID,
                TRANGTHAI: 'DANGDAT',
                SOLUONG: 1,
                THOIGIAN: new Date(),
            });
        }
    });

}



exports.findBookInCart = async(userID, bookID) => {
    await models.dathang.findOne({
        masach: bookID,
        makh: userID,
        TRANGTHAI: "DANGDAT",
    });
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

exports.removeCart = (bookID, customerID) => {
    models.dathang.destroy({
        where: {
            TRANGTHAI: "DANGDAT",
            masach: bookID,
            makh: customerID,
        }
    });
}