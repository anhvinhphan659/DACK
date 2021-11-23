
class adminController{



    //[GET]: /admin/account-manager
    accountM(req,res,next){
        res.render('admin/account-manager', { title: "Book Selling" });
    }
    //[GET]: /admin/receipt-manager
    receiptM(req,res,next){
        res.render('admin/receipt-manager', { title: "Book Selling" });
    }
    //[GET]: /admin/order-manager
    orderM(req,res,next){
        res.render('admin/order-manager', { title: "Book Selling" });
    }
    //[GET]: /admin/stock-manager
    stockM(req,res,next){
        res.render('admin/stock-manager', { title: "Book Selling" });
    }
    //[GET]: /admin/input-order
    InputO(req,res,next){
        res.render('admin/input-order', { title: "Book Selling" });
    }
    //[GET]: /admin/order-detail
    OrderD(req,res,next){
        res.render('admin/order-detail', { title: "Book Selling" });
    }
    //[GET]: /admin/receipt-detail
    receiptD(req,res,next){
        res.render('admin/receipt-detail', { title: "Book Selling" });
    }
}
module.exports = new adminController