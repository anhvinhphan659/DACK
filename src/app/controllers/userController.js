const adminservice = require('../services/siteService');
const {
    SequelizeToObject
} = require('../services/util/sequelize');


class UserController{

    // [GET]: /users/
    async index(req,res,next) {

         res.send('respond with a resource'); 
    }
    // [GET]: /users/personal-page
    async personal(req,res,next) {
        if(req.user.USER === req.params.username) {

            const account = await adminservice.getOneAccount(req.params.username);
            res.render('user/personal-page', { title: "Book Selling", user: SequelizeToObject(account)});
        }
        else {
            res.render('/')
        }        
    }

    //[PUT]: /users/:username/edit
    async edit(req, res, next){
        if(req.user.USER === req.params.username) {

            const account = await adminservice.getOneAccount(req.params.username);
            account.set(req.body);

            await account.save();
            res.redirect('back')
        }
        else {
            res.render('/')
        }        
    }
}
module.exports = new UserController