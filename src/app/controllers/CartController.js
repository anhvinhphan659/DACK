// const dathang = require('../models/dathang');
const CartService = require('../services/cartService');
const BookService = require('../services/bookService');
const {
    multipleSequelizeToObject,
    SequelizeToObject
} = require('../services/util/sequelize');

class CartController {
    // [GET]: /shopping-cart
    async cart(req, res, next) {
        // console.log("get cart--------------------------------");
        if (!req.user) {
            res.redirect('/login');
        } else {
            req.session.returnTo = req.originalUrl;
            // console.log("get cart--------------------------------");
            console.log(req.user);
            const carts = await CartService.findCurrentCartByUser(req.user.MAKH);

            console.log(carts[0]);
            res.render('books/shopping-cart', {
                title: "Book Selling",
                cartBooks: carts[0]
            });
            return;
        }
    }

    // [POST]: /shopping-cart
    async addToCart(req, res, next) {
            if (!req.user) {
                res.redirect('/login');
            } else {
                try {
                    const carts = await CartService.findCurrentCartByUser(req.user.MAKH);
                    // console.log(carts[0]);
                    const addbookID = req.body.bookid;
                    const addbookIMG = req.body.bookIMG;
                    const addbookName = req.body.bookName;
                    const addbookPrice = req.body.bookPrice;
                    var cart = carts[0];
                    if (cart.length > 0) {
                        const currentID = cart[0].iddathang;

                        //check if bookid existed
                        const existedPos = cart.find((o) => o.masach == addbookID);
                        if (existedPos >= 0) { //existed
                            //skip this
                        } else { //not existed
                            //create new in
                            await CartService.addNewBookToCart(currentID, addbookID, req.user.MAKH);
                            cart.push({
                                masach: addbookID,
                                SOLUONG: 1,
                                HINHANH: addbookIMG,
                                tensach: addbookName,
                            });
                        }


                    } else {
                        //generate new ID
                        const cartID = CartService.generateIDDatHang(req.user.MAKH);
                        console.log(cartID);
                        await CartService.addNewBookToCart(cartID, addbookID, req.user.MAKH);
                        cart.push({
                            masach: addbookID,
                            SOLUONG: 1,
                            HINHANH: addbookIMG,
                            tensach: addbookName,
                            gia: addbookPrice,
                        });

                    }
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


                const cart = carts[0]
                if (cart.length > 0) {

                    const currentID = cart[0].iddathang;
                    //check books in carts
                    var isSuccess = true;
                    var msg = "Thanh toán thành công";
                    for (let i = 0; i < cart.length; i++) {
                        if (cart[i].SOLUONG > cart[i].SL) {
                            isSuccess = false;
                            msg = "Thanh toán thất bại! Số lượng đặt mua trong giỏ hàng không hợp lệ hoặc sách đã hết! Mong quý khách kiểm tra lại!"
                        }
                    }
                    //if success update state of cart
                    if (isSuccess) {
                        CartService.payCart(iddathang);
                    }

                    console.log(currentID);
                    var payment = {
                        success: isSuccess,
                        message: msg
                    };
                    res.render("books/shopping-cart", {
                        cartBooks: cart,
                        payment: payment
                    });
                }



            } catch (err) {
                next(err);
            }
        }
    }
}

module.exports = new CartController;