const BookService = require('../services/bookService');
const CartService = require("../services/cartService");
class ApiController {
    //[GET] /api/books/:bookid
    async getBook(req, res, next) {
        var book = await BookService.findById(req.params.bookID);
        try {
            res.status(200).json({ book: book })
        } catch (err) {
            next(err);
        }
    }

    //[GET] /api/dathang/:userid
    async getDatHang(req, res, next) {
        var cart = await CartService.findCurrentCartByUser(req.params.userid);
        try {
            res.status(200).json({ cart: cart })
        } catch (err) {
            next(err);
        }
    }

    //[GET] /api/dathang/:userid/:bookid
    async getBookInCurrentCart(req, res, next) {
        
            const book = await CartService.findBookInCart(req.params.userid, req.params.bookid);
            try {
                res.status(200).json({ book: book });
            } catch (err) {
                next(err);
            }

        }
        //[POST] /api/dathang/:userid/:bookid
    async removeBookInCart(req, res, next) {
        if (req.user) {
            await CartService.removeCart(req.params.bookid, req.params.userid);
            res.status(200).send("Done");
        }
        if (req.session.cart) {
            const index = req.session.cart.listBook.findIndex((o) => o.masach == req.params.bookid);
            if (index >= 0) {
                req.session.cart.listBook.splice(index, 1);
                req.session.save();
                res.status(200).send(req.session.cart);
            }
        }


    }

    //[POST] /api/update/dathang/:bookid/:qty
    async updateInCart(req, res, next) {

        const bookid = req.params.bookid;
        const qty = req.params.qty;
        if (req.user) {
            const userID = req.user.MAKH;
            return await CartService.updateQtyBookInCart(userID, bookid, qty);

        } else {
            var currentCart = req.session.cart;
            const index = currentCart.listBook.findIndex((o) => o.masach == bookid);
            currentCart.listBook[index].SOLUONG = qty;
            req.session.save();
            res.send("update in cart");
        }


    }

}
module.exports = new ApiController;