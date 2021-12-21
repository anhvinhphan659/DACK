const {
    models
  } = require("../../config/db")
  const {
    Op
  } = require("sequelize");
const cloudImage = require("../../config/uploadIMG/cloudinary")
//Lấy thông tin 1 tài khoản
exports.getOneAccount = (username) => {
    return models.khachhang.findOne({where: {USER: username}})
}

//update info user 
exports.update = async (req) => {
    var user = await models.khachhang.findOne({where: {USER : req.params.username}})
    if (req.file) {
      var path = 'img/customer/' + user.MAKH + "/" ;
      if(user.IDHINHANH){
        await cloudImage.deleteIMG(user.IDHINHANH)
      }
      var result = await cloudImage.uploadIMG(req.file.path, path);
      req.body.HINHANH = result.secure_url;
      req.body.IDHINHANH = result.public_id;
    }
    user.set(req.body);
    await user.save();
    return user
  }