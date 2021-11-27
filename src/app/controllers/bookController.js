const siteService = require('../services/siteService');
const {SequelizeToObject} = require('../services/util/sequelize');
const {multipleSequelizeToObject} = require('../services/util/sequelize');


class UserController {

    // // [GET]: /book/novel
    // async novel(req, res, next) {
    //     const books = await siteService.findByType('TC');

    //     res.render('books/novel', { title: "Book Selling", books: multipleSequelizeToObject(books)});
    //     return;
    // }
    // // [GET]: /book/comic
    // async comic(req, res, next) {
    //     const books = await siteService.findByType('TT');
        
    //     res.render('books/comic', { title: "Book Selling", books: multipleSequelizeToObject(books) });
    //     return;
    // }

    // [GET]: /book/allBooks
    
    async showAll(req, res, next) {

        const books = await siteService.AllBooks();
        res.render('books/all-books', { title: "Book Selling", books: multipleSequelizeToObject(books) });
        return;
    }

    // [GET]: /book/type/:type
    async showType(req, res, next) {
        const bookType = req.params.id;
        var type = '';
        if (bookType == 'novel'){
            type = 'TC';
        }else {
            if(bookType == 'comic'){
                type = 'TT';
            }
        }
        const books = await siteService.findByType(type);
        
        res.render('books/books-type', { title: "Book Selling", books: multipleSequelizeToObject(books) });
        return;
    }

    // [GET]: /book/category/:category
    async showCategory(req, res, next) {
        const bookCategory = req.params.id;
        console.log(bookCategory)
        const books = await siteService.findByCategory(bookCategory);
        
        res.render('books/books-category', { title: "Book Selling", books: multipleSequelizeToObject(books), category: bookCategory });
        return;
    }


    
    // [GET]: /book/:masach
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