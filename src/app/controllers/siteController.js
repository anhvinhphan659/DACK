//connect to service for site
const siteservice = require('../services/siteService');
const {multipleSequelizeToObject} = require('../services/util/sequelize');

class SiteController {

    // [GET]: /
    async index(req, res, next) {
            const books = await siteservice.AllBooks();
           // res.send(books)
            res.render('home', { title: 'NoName' })
        }
    // [GET]: /search 
    async search(req, res, next) {
            const title = req.query.title;
            console.log(req.query.title);
            const books = await siteservice.findByTitle(title);
            res.render('search', { title: "Book Selling" , books: multipleSequelizeToObject(books), title: title})

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