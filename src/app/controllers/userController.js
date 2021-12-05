
class UserController{

    // [GET]: /users/
    index(req,res,next) {

         res.send('respond with a resource'); 
    }
    // [GET]: /users/personal-page
    personal(req,res,next) {
        res.render('user/personal-page', { title: "Book Selling" });
    }
    

    

}
module.exports = new UserController