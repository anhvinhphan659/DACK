var cart = { listBook: [] };
module.exports = class Cart {
    static getCart() {
        return cart;
    }
    static add(id) {
        cart.listBook.push(id);
    }
    static setListBook(newList) {
        cart.listBook = newList;
    }
    static empty() {
        cart.listBook = [];
    }
    static addNewBookToCart(oldCart, book) {
        const existedPos = oldCart.findIndex((o) => o.masach == book.masach);
        console.log("Existes POs" + String(existedPos));
        if (existedPos >= 0) {

        } else {
            oldCart.push(book);
        }
        return oldCart;
    }

}