const {
    models
} = require("../../config/db")
const {
    Op
} = require("sequelize");
const bcrypt = require("bcrypt")
exports.findUser = (username) => {
    return models.khachhang.findOne({where :{ USER : username}});
}
exports.genIDKH = async () => {
    var khachs = await models.khachhang.findAll({})
    var i = 1
    var check = true;
    var str
    var Hinhthuc = "KH"
    while (true) {
        check = true;
        str = "" + i;
        while (str.length < 4) {
            str = 0 + str;
        }
        s_key = Hinhthuc + str;
        for (let index = 0; index < khachs.length; index++) {
            if (khachs[index]['MAKH'] === s_key) {
                check = false;
                break;
            }
        }
        if (check) {
            return s_key;
        }
        i++
    }
}

exports.checkUSER = async (id) => {
    return await models.khachhang.count({
        where: {
            USER: id
        }
    })
        .then(count => {
            console.log(count);
            if (count != 0) {
                return true;
            } else
                return false;
        });
}

exports.getkhachhang = () =>{
    return models.khachhang
}
exports.hashPassword= (pass) =>{
    return bcrypt.hash(pass,10)
}