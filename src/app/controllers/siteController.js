//connect to service for site
const BookService = require('../services/bookService');

const siteservice = require('../services/siteService');

const {
    multipleSequelizeToObject
} = require('../services/util/sequelize');
const TITLE_PER_PAGE = 12;

class SiteController {

    // [GET]: /
    async index(req, res, next) {
            req.session.returnTo = req.originalUrl;
            const newComics = await siteservice.findNewBooks('TT');
            const newNovels = await siteservice.findNewBooks('TC');
            const hotComics = await siteservice.findHotBooks('TT');
            const hotNovels = await siteservice.findHotBooks('TC');
            res.render('home', {
                title: 'NoName',
                newComics: multipleSequelizeToObject(newComics),
                newNovels: multipleSequelizeToObject(newNovels),
                hotComics: multipleSequelizeToObject(hotComics),
                hotNovels: multipleSequelizeToObject(hotNovels)
            });
        }
        // [GET]: /search 
    async search(req, res, next) {
        req.session.returnTo = req.originalUrl;
        const title = req.query.title;
        var sort = req.query.sort || '';
        var page = parseInt(req.query.page);
        if (isNaN(page)) {
            page = 1;
        }

        const start = (page - 1) * TITLE_PER_PAGE;
        const end = start + TITLE_PER_PAGE;
        const books = await siteservice.findByTitle(title, sort);


        const booksArray = books;
        const totalPage = parseInt(booksArray.length % TITLE_PER_PAGE) == 0 ? parseInt(booksArray.length / TITLE_PER_PAGE) : parseInt(booksArray.length / TITLE_PER_PAGE) + 1;


        res.render('search', {
            title: "Book Selling",
            books: booksArray.slice(start, end),
            searchTitle: title,
            totalPage: totalPage,
            currentPage: page,
            sort
        })
        return;
    }



}
module.exports = new SiteController