const express = require('express')
const router = express.Router();
//import controller
const SiteController = require('../app/controllers/siteController')
const AuthController = require('../app/controllers/authController')
//import passport
const passport = require('./../config/auth/passport')
//upload file img
const upload = require('../config/uploadIMG/multer')


//for site
router.get('/shopping-cart', SiteController.cart)
router.get('/search', SiteController.search)
router.get('/', SiteController.index)
// for auth
router.post('/signup', upload.single('file'),AuthController.register)
router.post('/login',passport.authenticate('local',{failureRedirect: '/login?invalidlogin=true'}),AuthController.loginhandler)
router.get('/login', AuthController.login)
router.get('/signup',AuthController.signup)
router.get('/forgetpass', AuthController.forget)
router.get('/logout',AuthController.logout)



module.exports = router