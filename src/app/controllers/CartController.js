// const dathang = require('../models/dathang');
const Cart = require("../models/CartModel");
const phieumuaService = require("../services/phieumuaService");
const ct_phieumuaService = require("../services/ct_phieumuaService");
const CartService = require('../services/cartService');
const BookService = require('../services/bookService');
const {
    multipleSequelizeToObject,
    SequelizeToObject
} = require('../services/util/sequelize');
const { generator } = require("rand-token");
const { all } = require("sequelize/dist/lib/operators");
const phieumua = require("../models/phieumua");

class CartController {
    // [GET]: /shopping-cart
    async cart(req, res, next) {
        // console.log("get cart--------------------------------");

        if (!req.user) { //not login
            if (!req.session.cart) {
                req.session.cart = { listBook: [] };
            }

            res.render('cart/shopping-cart', {
                title: "Book Selling",
                cartBooks: req.session.cart.listBook,

            });
        } else { //login

            req.session.returnTo = req.originalUrl;


            const carts = await CartService.findCurrentCartByUser(req.user.MAKH);

            if (!req.session.cart) {
                console.log("Initialize cart");
                req.session.cart = { listBook: [] };
            }
            var cart = carts[0];
            const staticCart = req.session.cart.listBook;
            var iddh = 0;
            //push all book before login to cart
            if (cart.length > 0) {
                //get current ID
                iddh = cart[0].iddathang;
            } else {
                //generate new ID
                iddh = CartService.generateIDDatHang(req.user.MAKH);

            }
            for (let i = 0; i < staticCart.length; i++) {
                CartService.addNewBookToCart(iddh, staticCart[i].masach, req.user.MAKH);
                Cart.addNewBookToCart(cart, staticCart[i]);
            }

            //empty cart before login
            // Cart.empty();
            req.session.cart = { listBook: [] };
            req.session.save();

            res.render('cart/shopping-cart', {
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
                if (!req.session.cart) {
                    req.session.cart = { listBook: [] };
                }

                const addbookID = req.body.bookid;
                const addbookIMG = req.body.bookIMG;
                const addbookName = req.body.bookName;
                const addbookPrice = req.body.bookPrice;
                const addbookQty = req.body.bookQty;
                const addedBook = {
                    masach: addbookID,
                    SOLUONG: addbookQty,
                    HINHANH: addbookIMG,
                    tensach: addbookName,
                    gia: addbookPrice,
                }
                var booksInCart = req.session.cart.listBook;
                Cart.addNewBookToCart(booksInCart, addedBook);

                req.session.save();

                res.render('cart/shopping-cart', { cartBooks: booksInCart });

            } else { //login
                try {
                    const carts = await CartService.findCurrentCartByUser(req.user.MAKH);

                    const addbookID = req.body.bookid;
                    const addbookIMG = req.body.bookIMG;
                    const addbookName = req.body.bookName;
                    const addbookPrice = req.body.bookPrice;
                    const addbookQty = req.body.bookQty;
                    var cart = carts[0];
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
                                SOLUONG: addbookQty,
                                HINHANH: addbookIMG,
                                tensach: addbookName,
                                gia: addbookPrice,
                            };
                            Cart.addNewBookToCart(cart, newBook);
                        }


                    } else { //if not generate new ID
                        //generate new ID
                        const cartID = CartService.generateIDDatHang(req.user.MAKH);
                        await CartService.addNewBookToCart(cartID, addbookID, req.user.MAKH);
                        const newBook = {
                            masach: addbookID,
                            SOLUONG: addbookQty,
                            HINHANH: addbookIMG,
                            tensach: addbookName,
                            gia: addbookPrice,
                        };
                        Cart.addNewBookToCart(cart, newBook);

                    }     
                    res.render('cart/shopping-cart', { cartBooks: cart });

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
                            //update in databse
                        await phieumuaService.addPhieuMua(currentID, req.user.MAKH);
                        for (let i = 0; i < cart.length; i++) {
                            const bookID = cart[i].masach;
                            const qty = cart[i].SOLUONG;

                            await BookService.updateQtyBook(bookID, qty);
                            await ct_phieumuaService.addctPhieumua(currentID, bookID, qty);
                        }
                        await CartService.payCart(currentID);

                    } else {
                        result = "Thanh toán thất bại!";

                    }



                    res.render("cart/payCart", { paymentResult: result, caution: msg });
                }

            } catch (err) {

                res.render("cart/payCart", { paymentResult: "Lỗi thanh toán", caution: "Có lỗi trong quá trình thanh toán mong quý khách thông cảm!" });
            }
        }
    }

    //[GET] /shopping-cart/history
    async getHistory(req, res, next) {
        if (req.user) {
            const allCarts = await CartService.getAllCartByUser(req.user.MAKH);
            const allCart = allCarts[0];
            var cart = [];
            for (let i = 0; i < allCart.length; i++) {
                const current = allCart[i];
                if (cart.length > 0) {
                    const index = cart.find((o) => o.iddh == current.iddathang);
                    if (index >= 0) {
                        cart[index].listBook.push({
                            masach: current.masach,
                            SOLUONG: current.SOLUONG,
                            tensach: current.tensach,
                            gia: current.gia,
                            HINHANH: current.HINHANH,
                            THOIGIAN: current.THOIGIAN,
                        });
                        cart[index].total += current.gia * current.SOLUONG;
                    } else {
                        cart.push({
                            iddh: current.iddathang,
                            listBook: [{
                                masach: current.masach,
                                SOLUONG: current.SOLUONG,
                                tensach: current.tensach,
                                gia: current.gia,
                                HINHANH: current.HINHANH,
                                THOIGIAN: current.THOIGIAN,
                            }],
                            total: current.gia * current.SOLUONG,
                        });
                    }
                } else {
                    cart.push({
                        iddh: current.iddathang,
                        listBook: [{
                            masach: current.masach,
                            SOLUONG: current.SOLUONG,
                            tensach: current.tensach,
                            gia: current.gia,
                            HINHANH: current.HINHANH,
                            THOIGIAN: current.THOIGIAN,
                        }],
                        total: current.gia * current.SOLUONG,
                    });
                }

            }
            res.render('cart/historyCart', { alls: cart });
        } else {
            res.redirect(404);
        }
    }


}

module.exports = new CartController;