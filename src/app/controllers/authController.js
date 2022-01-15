const authservice = require('../services/authService');
const {
    multipleSequelizeToObject
} = require('../services/util/sequelize');
//connect to service for auth
const passport = require('../../config/auth/passport');

class authController {
    //[GET] : /logout
    logout(req, res, next){
        try{
            req.logout()
            res.redirect('/')
        }catch (e) {
            next(e)
        }
    }
    
    // [GET]: /login 
    login(req, res, next) {
        try{
            if(!req.user){
                res.render('auth/login', {
                    title: "Book Selling",
                    invalidlogin: req.query.invalidlogin,
                });
            }else {
                res.redirect('/')
            }
        } catch (e) {
            next(e);
        }
    }
    //[GET]: /signup 
    signup(req, res, next) {
        res.render('auth/signup', {
            title: 'NoName',
            errorEmpty: req.query.errorEmpty,
            errorPASS: req.query.errorPASS,
            errorUSER: req.query.errorUSER,
        });
        return;
    }
    // [GET]: /forget
    forget(req, res, next) {
        res.render('auth/forgetpass', {
            title: 'NoName'
        });
        return;
    }
    // [POST]: /forget
    async forgetPost(req, res, next) {
        try {
            var email = await authservice.getMail(req)
            const token = await authservice.sendEmail(email)
            var messages
            if (token) {
                let hide = email.EMAIL.split("@")[0].length - 2;//<-- number of characters to hide
                var r = new RegExp(".{"+hide+"}@", "g")
                var jmail = email.EMAIL.replace(r, "***@" );
                messages = ` vui lòng check mail ${jmail} để lấy link  ( tồn tại trong 20 phút ) `
            }else {
                messages = ` Đã có lỗi xảy ra , xin hãy thử lại  `
            }
            res.render('auth/inforget',{messages})
        } catch (error) {
            next(error);
        } 
    }
    //[POST]: /login
    loginhandler(req, res, next){
        try {
            if(req.user){
                res.redirect(req.session.returnTo||'/')
                delete req.session.returnTo
            }else{
                res.redirect('/login')
            }
        }catch (e) {
            next(e);
        }
    }
    //[POST]: /register
    async register(req, res, next){
        try {
             // check if null
        var check = await authservice.checkUSER(req.body.USER)
        var checkPASS = !(req.body.PASS === req.body.REPASS)
        // check exist user
        if(check){
            res.redirect('/signup?errorUSER=true')
            next();
        }
        await authservice.create(req)
        req.body.username = req.body.USER
        req.body.password = req.body.REPASS
        passport.authenticate('local')(req, res, function () {
            res.redirect(req.session.returnTo||'/');
            delete req.session.returnTo
        })
        } catch (error) {
            next(error);
        }   
    }
    //
    async resetPass (req, res, next) {
        try {
            const token = req.query.token 
            const check = await authservice.checktoken(token)
            if(check) {
                res.render('auth/repass',{token})
            }else{
                res.send('respond with a resource')
            }
            
        } catch (error) {
            next(error);
        }
    }
    //
    async resetPassPost(req, res, next) {
        try {
            const change = await authservice.resetPass(req)
            if(change){
                res.redirect('/login')
            }else{
                res.redirect('back')
            } 
        } catch (error) {
            next(error);
        }
    }

}
module.exports = new authController