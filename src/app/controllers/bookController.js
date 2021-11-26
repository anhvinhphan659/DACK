const findbook = require('../services/findbookdetail');
const findbooktype = require('../services/findBookType');
const siteService = require('../services/siteService');
const {SequelizeToObject} = require('../services/util/sequelize');
const {multipleSequelizeToObject} = require('../services/util/sequelize');


class UserController {

    // [GET]: /book/novel
    async novel(req, res, next) {
        console.log("novel");
        const books = await findbooktype('TC');
        res.render('books/novel', { title: "Book Selling", books: multipleSequelizeToObject(books)});
        return;
    }
    // [GET]: /book/comic
    async comic(req, res, next) {
        console.log("comic");
        
        const books = await findbooktype('TT');
        res.render('books/comic', { title: "Book Selling", books: multipleSequelizeToObject(books) });
        return;
    }

    // [GET]: /book/allBooks
    async showAll(req, res, next) {
        console.log("all");

        const books = await siteService();
        res.render('books/comic', { title: "Book Selling", books: multipleSequelizeToObject(books) });
        return;
    }

    
    // [GET]: /book/:masach
    async show(req, res, next) {
        const bookId = req.params.id;
        const book = await findbook(bookId);
        console.log("detail");

        res.render('books/book-detail', {
            title: "Book Selling",
            book: SequelizeToObject(book)
        })
        return;
    }
}
module.exports = new UserController