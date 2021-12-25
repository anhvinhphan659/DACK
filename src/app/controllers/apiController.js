const BookService = require('../services/bookService');
const CartService = require("../services/cartService");
class ApiController {
    //[GET]api/books/:bookid
    async getBook(req, res, next) {
        // bookid = req.params.bookID;
        // console.log(bookid);
        console.log(req.params.bookID);
        var book = await BookService.findById(req.params.bookID);
        try {
            res.status(200).json({ book: book })
        } catch (err) {
            next(err);
        }
    }

    //[GET]api/dathang/:userid
    async getDatHang(req, res, next) {
        var cart = await CartService.findCurrentCartByUser(req.params.userid);
        try {
            console.log("TEST API");
            console.log(cart[0].length);
            res.status(200).json({ cart: cart })
        } catch (err) {
            next(err);
        }
    }

}
module.exports = new ApiController;