const { multipleSequelizeToObject, SequelizeToObject } = require('../services/util/sequelize');
var cart = null;
module.exports = class Cart {
    static save(book) {
        book = SequelizeToObject(book);
        if (cart) {
            const existesIndex = cart.buyBooks.findIndex(b => book.masach == b.masach); //check existed book
            console.log(cart.buyBooks);
            if (existesIndex >= 0) { //existed in buyBook
                const existedBook = cart.buyBooks[existesIndex];
                existedBook.qty += 1;
                cart.totalPrice += existedBook.gia * existesIndex.qty;
                existedBook.subPrice = existedBook.gia * existedBook.qty;
                // cart.buyBooks[existedBook]=existedBook
            } else {
                book.qty = 1;
                cart.buyBooks.push(book);
                cart.totalPrice += book.gia * book.qty;
                book.subPrice = book.gia * book.qty;
                // console.log(totalPrice);
            }


        } else {
            cart = { buyBooks: [], totalPrice: 0 };
            book.qty = 1;
            book.subPrice = book.gia * book.qty;
            cart.buyBooks.push(book);
            cart.totalPrice = book.gia * book.qty;
        }

    }
    static getCart() {
        return cart;
    }
}