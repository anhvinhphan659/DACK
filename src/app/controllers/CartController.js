// const dathang = require('../models/dathang');
const Cart = require("../models/CartModel");
const CartService = require('../services/cartService');
const BookService = require('../services/bookService');
const {
    multipleSequelizeToObject,
    SequelizeToObject
} = require('../services/util/sequelize');
const { generator } = require("rand-token");

class CartController {
    // [GET]: /shopping-cart
    async cart(req, res, next) {
        // console.log("get cart--------------------------------");

        if (!req.user) { //not login
            console.log(Cart.getCart().listBook);
            res.render('books/shopping-cart', {
                title: "Book Selling",
                cartBooks: Cart.getCart().listBook,

            });
        } else { //login
            req.session.returnTo = req.originalUrl;
            // console.log("get cart--------------------------------");
            // console.log(req.user);
            const carts = await CartService.findCurrentCartByUser(req.user.MAKH);
            console.log(Cart.getCart());
            var cart = carts[0];
            const staticCart = Cart.getCart().listBook;
            var iddh = 0;
            //push all book before login to cart
            if (cart.length > 0) {
                //get current ID
                iddh = cart[0].iddathang;
            } else {
                //generate new ID
                iddh = CartService.generateIDDatHang(req.user.MAKH);
                console.log(iddh);
            }
            for (let i = 0; i < staticCart.length; i++) {
                CartService.addNewBookToCart(iddh, staticCart[i].masach, req.user.MAKH);
                Cart.addNewBookToCart(cart, staticCart[i]);
            }

            //empty cart before login
            Cart.empty();

            // console.log(carts[0]);
            res.render('books/shopping-cart', {
                title: "Book Selling",
                cartBooks: cart,
                makh: req.user.MAKH,
            });
            return;
        }
    }

    // [POST]: /shopping-cart
    async addToCart(req, res, next) {
            if (!req.user) { //not login
                const addbookID = req.body.bookid;
                const addbookIMG = req.body.bookIMG;
                const addbookName = req.body.bookName;
                const addbookPrice = req.body.bookPrice;
                const addedBook = {
                    masach: addbookID,
                    SOLUONG: 1,
                    HINHANH: addbookIMG,
                    tensach: addbookName,
                    gia: addbookPrice,
                }
                var booksInCart = Cart.getCart().listBook;
                Cart.addNewBookToCart(booksInCart, addedBook);
                console.log(Cart.getCart().listBook);

                res.render('books/shopping-cart', { cartBooks: booksInCart });

            } else {
                try {
                    const carts = await CartService.findCurrentCartByUser(req.user.MAKH);

                    // console.log(carts[0]);
                    const addbookID = req.body.bookid;
                    const addbookIMG = req.body.bookIMG;
                    const addbookName = req.body.bookName;
                    const addbookPrice = req.body.bookPrice;
                    var cart = carts[0];
                    console.log(cart);
                    //check if customer has current id for cart
                    if (cart.length > 0) {
                        const currentID = cart[0].iddathang;

                        //check if bookid existed
                        const existedPos = cart.find((o) => o.masach == addbookID);
                        if (existedPos >= 0) { //existed
                            //skip this
                        } else { //not existed
                            //create new in
                            await CartService.addNewBookToCart(currentID, addbookID, req.user.MAKH);
                            const newBook = {
                                masach: addbookID,
                                SOLUONG: 1,
                                HINHANH: addbookIMG,
                                tensach: addbookName,
                                gia: addbookPrice,
                            };
                            Cart.addNewBookToCart(cart, newBook);
                        }


                    } else { //if not generate new ID
                        //generate new ID
                        const cartID = CartService.generateIDDatHang(req.user.MAKH);
                        console.log(cartID);
                        await CartService.addNewBookToCart(cartID, addbookID, req.user.MAKH);
                        const newBook = {
                            masach: addbookID,
                            SOLUONG: 1,
                            HINHANH: addbookIMG,
                            tensach: addbookName,
                            gia: addbookPrice,
                        };
                        Cart.addNewBookToCart(cart, newBook);

                    }
                    console.log(cart);
                    res.render('books/shopping-cart', { cartBooks: cart });

                } catch (err) {
                    next(err);
                }
            }

            // res.render("books/shopping-cart", { cartBooks: Cart.getCart().buyBooks });
        }
        // [POST]: /shopping-cart/payment
    async payCart(req, res, next) {
        if (!req.user) {
            res.redirect('/login');
        } else {
            //handle to database
            // res.send(Cart.getCart());
            try {
                const carts = await CartService.findCurrentCartByUser(req.user.MAKH);


                const cart = carts[0];
                console.log(cart);
                if (cart.length > 0) {

                    const currentID = cart[0].iddathang;
                    //check books in carts
                    var isSuccess = true;
                    var msg = "Đơn đặt hàng đã được ghi nhận! Cảm ơn quý khách đã tin tưởng sử dụng dịch vụ.";
                    for (let i = 0; i < cart.length; i++) {
                        if (cart[i].SOLUONG > cart[i].SL) {
                            isSuccess = false;
                            msg = "Số lượng đặt mua trong giỏ hàng không hợp lệ hoặc sách đã hết! Mong quý khách kiểm tra lại!"
                        }
                    }
                    var result = ""
                        //if success update state of cart
                    if (isSuccess) {
                        CartService.payCart(currentID);
                        result = "Thanh toán thành công"
                    } else {
                        result = "Thanh toán thất bại!";
                        //update in databse
                        for (let i = 0; i < cart; i++) {
                            const bookID = cart[i].masach;
                            const qty = cart[i].SOLUONG;
                            BookService.updateQtyBook(bookID, qty);
                        }
                        await CartService.payCart(currentID);

                    }

                    console.log(currentID);

                    res.render("cart/payCart", { paymentResult: result, caution: msg });
                }

            } catch (err) {
                next(err);
            }
        }
    }
    async getpayCart(req, res, next) {

    }

    //[POST]:/shopping-cart/remove/:idsach
    async removeCart(req, res, next) {

    }


}

module.exports = new CartController;