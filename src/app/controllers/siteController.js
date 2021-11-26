//connect to service for site
const siteservice = require('../services/siteService');
const {multipleSequelizeToObject} = require('../services/util/sequelize');
const bookCategory = require('../services/findBookType')

class SiteController {

    // [GET]: /
    async index(req, res, next) {
            const books = await siteservice.list();
           // res.send(books)
            res.render('home', { title: 'NoName' })
        }
    // [GET]: /search 
    async search(req, res, next) {
            const type = req.query.type;
            var temp0 = '';
            var temp1 = '';
            if(type === "truyen_chu") {
                temp0 = 'TC';
                temp1 = "Truyện chữ";
            } else{
                if(type == "truyen_tranh"){
                    temp0 = "TT";
                    temp1 = "Truyện tranh";
                }
            } 
            const books = await bookCategory(temp0);
            res.render('search', { title: "Book Selling" , searchtitle: multipleSequelizeToObject(books), type: temp1 })
       // res.send(books)
        return;
        }
        // [GET]: /login 
    login(req, res, next) {
            res.render('login', { title: "Book Selling" });
            return;
        }
        //[GET]: /signup 
    signup(req, res, next) {
        res.render('signup', { title: 'NoName' });
        return;
    }
    // [GET]: /forget
    forget(req, res, next) {
            res.render('forgetpass', { title: 'NoName' });
            return;
        }
        // [GET]: /shopping-cart
    cart(req, res, next) {
        res.render('books/shopping-cart', { title: "Book Selling" });
        return;
    }
}
module.exports = new SiteController