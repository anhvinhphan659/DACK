const BookService = require('./bookService');

exports.getBook = (book_id) => {
    return BookService.findById(book_id);
}