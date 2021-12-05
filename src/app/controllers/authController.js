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
        if(req.body.HOTEN ==="" || req.body.USER ==="" || req.body.EMAIL ==="" || req.body.PHAI==="" 
        || req.body.HINHANH==="" || req.body.NGAYSINH ===""
            || req.body.SDT ==="" || req.body.PASS ==="" || req.body.REPASS ==="" || req.body.DIACHI ===""){
                res.redirect('/signup?errorEmpty=true')
        }
        var check = await authservice.checkUSER(req.body.USER)
        var checkPASS = !(req.body.PASS === req.body.REPASS)
        // check exist user
        if(check){
            res.redirect('/signup?errorUSER=true')
        }
        if(checkPASS){
            res.redirect('/signup?errorPASS=true')
        }
        req.body.MAKH = await authservice.genIDKH()
        req.body.PASS = await authservice.hashPassword(req.body.PASS)
        var khach = await authservice.getkhachhang().create({
            MAKH : req.body.MAKH,
            HOTEN : req.body.HOTEN,
            PASS : req.body.PASS,
            USER : req.body.USER,
            PHAI : req.body.PHAI,
            NGAYSINH : req.body.NGAYSINH,
            HINHANH : req.body.HINHANH,
            EMAIL : req.body.EMAIL,
            SDT : req.body.SDT,
            DIACHI : req.body.DIACHI,
        })
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

}
module.exports = new authController