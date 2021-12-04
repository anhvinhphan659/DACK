const siteservice = require('../services/siteService');
const {multipleSequelizeToObject} = require('../services/util/sequelize');
module.exports = async function CategoriesMiddleware (req,res,next){
    const cate = await siteservice.listTheloai();
    res.locals.categories = multipleSequelizeToObject(cate)
    next();
}