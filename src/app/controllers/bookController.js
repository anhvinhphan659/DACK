const bookService = require('../services/bookService');
const {
    SequelizeToObject
} = require('../services/util/sequelize');
const {
    multipleSequelizeToObject
} = require('../services/util/sequelize');
const TITLE_PER_PAGE = 12;

class BookController {

    /// [GET]: /book/allBooks
    async showAll(req, res, next) {
        req.session.returnTo = req.originalUrl;
        var page = parseInt(req.query.page);
        var sort = req.query.sort|| '';
        if (isNaN(page)) {
            page = 1;
        }
        const start = (page - 1) * TITLE_PER_PAGE;
        const end = start + TITLE_PER_PAGE;
        const books = await bookService.AllBooks(sort);


        const booksArray = books;
        const totalPage = parseInt(booksArray.length % TITLE_PER_PAGE) == 0 ?  parseInt(booksArray.length / TITLE_PER_PAGE) : parseInt(booksArray.length / TITLE_PER_PAGE) + 1;
        res.render('books/all-books', {
            title: "Book Selling",
            books: booksArray.slice(start, end),
            totalPage: totalPage,
            currentPage: page,
            sort
        });

        return;
    }

    // [GET]: /book/type/:type
    async showType(req, res, next) {
        req.session.returnTo = req.originalUrl;
        var bookType = req.params.id;
        var sort = req.query.sort|| '';

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
        const books = await bookService.findByType(type,sort);

        var page = parseInt(req.query.page);
        // console.log(page);
        if (isNaN(page)) {
            page = 1;
        }
        const start = (page - 1) * TITLE_PER_PAGE;
        const end = start + TITLE_PER_PAGE;
        const booksArray = books;

        // console.log(booksArray);

        res.render('books/books-type', {
            title: "Book Selling",
            books: booksArray.slice(start, end),
            totalPage: parseInt(booksArray.length / TITLE_PER_PAGE) + 1,
            currentPage: page,
            Type: bookType,
            sort
        });
        return;
    }

    // [GET]: /book/category/:category
    async showCategory(req, res, next) {
        req.session.returnTo = req.originalUrl;
        var bookCategory = req.params.id;
        var sort = req.query.sort|| '';
        console.log(sort)

        const books = await bookService.findByCategory(bookCategory,sort);
 
        var page = parseInt(req.query.page);
        if (isNaN(page)) {
            page = 1;
        }
        const start = (page - 1) * TITLE_PER_PAGE;
        const end = start + TITLE_PER_PAGE;
        const booksArray = books;
        // console.log(booksArray);
        //res.send(books)
        res.render('books/books-category', {
            title: "Book Selling",
            books: booksArray.slice(start, end),
            totalPage: parseInt(booksArray.length / TITLE_PER_PAGE) + 1,
            currentPage: page,
            category: bookCategory,
            sort
        });
        return;
    }

    // [GET]: /books/:masach  (Chi tiết truyện)
    async show(req, res, next) {
        req.session.returnTo = req.originalUrl;
        const bookId = req.params.id;
        const book = await bookService.findById(bookId);
        res.render('books/book-detail', {
            title: "Book Selling",
            book: SequelizeToObject(book)
        })
        return;
    }
    //[POST]: /books/:masach/comment
    async inputcmt(req, res, next) {
        try {
            if(req.user){
                var cmt = await bookService.writecomment(req)
                res.status(200).json({})
            }else{
                res.status(404).json({})
            }
        } catch (error) {
            next(error);
        }
        
    }
    //[GET]: /books/:masach/comment
    async showcmt (req, res, next) {
        try {
            var cmt = await bookService.getcomment(req);
            res.status(200).json({cmt : cmt[0]})
        } catch (error) {
            next(error);
        }

    }
}
module.exports = new BookController