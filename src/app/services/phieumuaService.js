const { models, sequelize } = require("../../config/db");
const { Op, where } = require("sequelize");

exports.addPhieuMua = async(iddh, userid) => {
    await models.phieumua.create({
        MAPM: iddh,
        NGAYMUA: new Date(),
        MAKH: userid
    });
}