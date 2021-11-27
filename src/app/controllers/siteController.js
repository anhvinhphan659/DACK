//connect to service for site

const siteservice = require('../services/siteService');
const { multipleSequelizeToObject } = require('../services/util/sequelize');
const TITLE_PER_PAGE = 12;

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
            var page = parseInt(req.query.page);
            if (isNaN(page)) {
                page = 1;
            }

            const start = (page - 1) * TITLE_PER_PAGE;
            const end = start + TITLE_PER_PAGE;
            const books = await siteservice.findByTitle(title);


            const booksArray = multipleSequelizeToObject(books);
            // console.log(booksArray.slice(0, 5));
            // booksArray = booksArray.splice(0, skip);


            res.render('search', { title: "Book Selling", books: booksArray.slice(start, end), searchTitle: title, totalPage: parseInt(booksArray.length / TITLE_PER_PAGE) + 1, currentPage: page })

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