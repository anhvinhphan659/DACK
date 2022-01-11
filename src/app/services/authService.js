const { models } = require("../../config/db");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const cloudImage = require("../../config/uploadIMG/cloudinary");
const randtoken = require("rand-token");
const mailService = require("../../config/mail/nodemailer");

exports.findUser = (username) => {
  return models.khachhang.findOne({ where: { USER: username } , raw : true});
};
exports.genIDKH = async () => {
  var khachs = await models.khachhang.findAll({paranoid: false,});
  var i = 1;
  var check = true;
  var str;
  var Hinhthuc = "KH";
  while (true) {
    check = true;
    str = "" + i;
    while (str.length < 4) {
      str = 0 + str;
    }
    s_key = Hinhthuc + str;
    for (let index = 0; index < khachs.length; index++) {
      if (khachs[index]["MAKH"] === s_key) {
        check = false;
        break;
      }
    }
    if (check) {
      return s_key;
    }
    i++;
  }
};

exports.checkUSER = async (id) => {
  return await models.khachhang
    .count({
      where: {
        USER: id,
      },
      paranoid: false,
    })
    .then((count) => {
      if (count != 0) {
        return true;
      } else return false;
    });
};

exports.getkhachhang = () => {
  return models.khachhang;
};
exports.hashPassword = (pass) => {
  return bcrypt.hash(pass, 10);
};

exports.create = async (req) => {
  req.body.MAKH = await this.genIDKH();
  req.body.PASS = await this.hashPassword(req.body.PASS);
  req.body.HINHANH = "";
  if (req.file) {
    var path = "img/customer/" + req.body.MAKH + "/";
    var result = await cloudImage.uploadIMG(req.file.path, path);
    req.body.HINHANH = result.secure_url;
    req.body.IDHINHANH = result.public_id;
  }
  var khach = await models.khachhang.create({
    MAKH: req.body.MAKH,
    HOTEN: req.body.HOTEN,
    PASS: req.body.PASS,
    USER: req.body.USER,
    PHAI: req.body.PHAI,
    NGAYSINH: req.body.NGAYSINH,
    HINHANH: req.body.HINHANH,
    EMAIL: req.body.EMAIL,
    SDT: req.body.SDT,
    DIACHI: req.body.DIACHI,
  });
  return khach;
};

exports.getMail = async (req) => {
  return await models.khachhang.findOne({
    attributes: ["EMAIL", "MAKH"],
    where: { USER: req.body.user },
  });
};

exports.sendEmail = async (email) => {
  if (!email) {
    return 0;
  }
  var token = randtoken.generate(20);
  var sent = await mailService.sendEmail(email.EMAIL, token);
  if (!sent) {
    await models.token_pass.create({
      MAKH: email.MAKH,
      TOKEN: token,
    });
  }
  return !sent;
};
exports.checktoken = async (token) => {
  var check = await models.token_pass.findOne({ where: { TOKEN: token } });
  await models.token_pass.destroy({
    where: {
      createdAt: {
        [Op.lt]: new Date(new Date() - 60 * 60 * 1000),
      },
    },
    force: true,
    paranoid: false,
  });
  if (!check) {
    return 0;
  }
  if (check.createdAt < new Date(new Date() - 20 * 60 * 1000)) {
    return 0;
  }
  return check
};

exports.resetPass = async (req) => {
  const user = await models.token_pass.findOne({ attributes: ["MAKH"], token : req.body.token})
  if(!user){
    return 0
  }
  req.body.PASS = await bcrypt.hash(req.body.newpass,10) 
  var change = await models.khachhang.update(
    {PASS: req.body.PASS},
    {where: {MAKH: user.MAKH}})
  if(!change){
    return 0
  }
  await models.token_pass.destroy({
    where: {
      token : req.body.token,
    },
    force: true,  
    paranoid: false,
  });
  return 1;
}