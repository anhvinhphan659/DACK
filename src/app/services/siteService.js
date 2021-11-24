const {models} = require("../../config/db")

exports.list= () =>{
    return models.sach.findAll();
}

// exports.list= () =>{
//     console.log("12345");
//     const a = models.sach.findAll();
//     console.log(a);
//     return models.sach.findAll();
// }