
class UserController{

    // [GET]: /book/book-detail
    show(req,res,next) {
        res.render('books/book-detail', { title: 'NoName' });
    }
    
    

    

}
module.exports = new UserController