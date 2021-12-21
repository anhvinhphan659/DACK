const userservice = require('../services/userService');
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
        if(req.user){
            if(req.user.USER === req.params.username) {
                const account = await userservice.getOneAccount(req.params.username);
                res.render('user/personal-page', { title: "Book Selling", user: SequelizeToObject(account)});
            }
            else {
                res.render('/')
            }        
        }else {
            res.render('/')
        }            
    }

    //[PUT]: /users/:username/edit
    async edit(req, res, next){
        if(req.user) {
            if(req.user.USER == req.params.username){
                const account = await userservice.update(req);
                res.redirect('back')
            }else{
                res.redirect('/')
            }
        }
        else {
            res.redirect('/')
        }        
    }
    // [POST]: user/:username/changepass
    async changepass (req, res, next) {
        try {
            res.send(req.body)
        } catch (error) {
            next(error);
        }
    }
    // [GET]: user/:username/changepass
    async getchangepass (req, res, next) {
        try {
            if(req.user){
                if(req.user.USER === req.params.username){
                    res.render('user/changepass', {})
                }else{
                    res.send('respond with a resource'); 
                }
            }else{
                res.redirect('/')
            }
            
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new UserController