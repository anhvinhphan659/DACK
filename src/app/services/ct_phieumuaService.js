const { models, sequelize } = require("../../config/db");
const { Op } = require("sequelize");

exports.addctPhieumua = async(iddh, bookID, qty) => {
    await models.ct_phieumua.create({
        MAPM: iddh,
        MASACH: bookID,
        SL: qty,
    })

}