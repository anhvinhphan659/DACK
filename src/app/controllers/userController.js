
class UserController{

    // [GET]: /users/
    index(req,res,next) {

         res.send('respond with a resource'); 
    }
    // [GET]: /users/personal-page
    personal(req,res,next) {
        console.log(req.params.username)
        if(req.user.USER === req.params.username) {

            res.render('user/personal-page', { title: "Book Selling", user: req.user });
        }
        else {
            res.send("THONG BAO KHONG HOP LE")
        }        
    }   
}
module.exports = new UserController