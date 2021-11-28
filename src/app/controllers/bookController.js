const siteService = require('../services/siteService');
const {
    SequelizeToObject
} = require('../services/util/sequelize');
const {
    multipleSequelizeToObject
} = require('../services/util/sequelize');
const TITLE_PER_PAGE = 12;

class UserController {

    /// [GET]: /book/allBooks
    async showAll(req, res, next) {

        var page = parseInt(req.query.page);
        if (isNaN(page)) {
            page = 1;
        }
        const start = (page - 1) * TITLE_PER_PAGE;
        const end = start + TITLE_PER_PAGE;
        const books = await siteService.AllBooks();


        const booksArray = multipleSequelizeToObject(books);
        const totalPage = parseInt(booksArray.length % TITLE_PER_PAGE) == 0 ?  parseInt(booksArray.length / TITLE_PER_PAGE) : parseInt(booksArray.length / TITLE_PER_PAGE) + 1;
        res.render('books/all-books', {
            title: "Book Selling",
            books: booksArray.slice(start, end),
            totalPage: totalPage,
            currentPage: page
        });

        return;
    }

    // [GET]: /book/type/:type
    async showType(req, res, next) {
        var bookType = req.params.id;
        console.log(bookType);

        //cut string after query page
        if (String(bookType).indexOf("&&") >= 0) {
            bookType = String(bookType).split("&&")[0];
        }
        var type = '';
        if (bookType == 'novel') {
            type = 'TC';
        } else {
            if (bookType == 'comic') {
                type = 'TT';
            }
        }
        const books = await siteService.findByType(type);

        var page = parseInt(req.query.page);
        // console.log(page);
        if (isNaN(page)) {
            page = 1;
        }

        const start = (page - 1) * TITLE_PER_PAGE;
        const end = start + TITLE_PER_PAGE;
        const booksArray = multipleSequelizeToObject(books);
        console.log("Total " + booksArray.length);
        console.log
        // console.log(booksArray);

        res.render('books/books-type', {
            title: "Book Selling",
            books: booksArray.slice(start, end),
            totalPage: parseInt(booksArray.length / TITLE_PER_PAGE) + 1,
            currentPage: page,
            Type: bookType
        });
        return;
    }

    // [GET]: /book/category/:category
    async showCategory(req, res, next) {
        var bookCategory = req.params.id;

        const books = await siteService.findByCategory(bookCategory);
        var page = parseInt(req.query.page);
        if (isNaN(page)) {
            page = 1;
        }
        const start = (page - 1) * TITLE_PER_PAGE;
        const end = start + TITLE_PER_PAGE;
        const booksArray = multipleSequelizeToObject(books);
        // console.log(booksArray);

        res.render('books/books-category', {
            title: "Book Selling",
            books: booksArray.slice(start, end),
            totalPage: parseInt(booksArray.length / TITLE_PER_PAGE) + 1,
            currentPage: page,
            category: bookCategory
        });
        return;
    }

    // [GET]: /book/:masach  (Chi tiết truyện)
    async show(req, res, next) {
        const bookId = req.params.id;
        const book = await siteService.findById(bookId);

        res.render('books/book-detail', {
            title: "Book Selling",
            book: SequelizeToObject(book)
        })
        return;
    }
}
module.exports = new UserController