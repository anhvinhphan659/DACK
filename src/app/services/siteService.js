const {models} = require("../../config/db")

exports.list= () =>{
    return models.sach.findAll();
}