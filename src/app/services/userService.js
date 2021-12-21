const { models } = require("../../config/db");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const cloudImage = require("../../config/uploadIMG/cloudinary");
//Lấy thông tin 1 tài khoản
exports.getOneAccount = (username) => {
  return models.khachhang.findOne({ where: { USER: username } });
};

//update info user
exports.update = async (req) => {
  var user = await models.khachhang.findOne({
    where: { USER: req.params.username },
  });
  if (req.file) {
    var path = "img/customer/" + user.MAKH + "/";
    if (user.IDHINHANH) {
      await cloudImage.deleteIMG(user.IDHINHANH);
    }
    var result = await cloudImage.uploadIMG(req.file.path, path);
    req.body.HINHANH = result.secure_url;
    req.body.IDHINHANH = result.public_id;
  }
  user.set(req.body);
  await user.save();
  return user;
};
exports.changePass = async (req) => {
  var Cus = await models.khachhang.findOne({where:{
    USER : req.user.USER,
  }})
 
  if((await bcrypt.compare(req.body.pass,Cus.PASS))){
      req.body.PASS = await bcrypt.hash(req.body.newpass,10) 
      await models.khachhang.update(
        {PASS: req.body.PASS},
        {where: {USER: Cus.USER}} )
     return 1;
  }else{
    return 0;
  }
};
