
class SiteController{

    // [GET]: /
    index(req,res,next) {
        res.render('home', { title: 'NoName' })
    }
    // [GET]: /search 
    search(req,res,next){
        var searchTitle = req.query.title;
        res.render('search',{ title: "Book Selling", searchtitle: searchTitle, })
        return ;
    }
    // [GET]: /login 
    login(req,res,next){
        res.render('login', { title: "Book Selling" });
        return ;
    }
    //[GET]: /signup 
    signup(req,res,next){
        res.render('signup', { title: 'NoName' });
        return ;
    }
    // [GET]: /shopping-cart
    cart(req,res,next){
        res.render('books/shopping-cart', { title: "Book Selling" });
        return ;
    }

    

}
module.exports = new SiteController