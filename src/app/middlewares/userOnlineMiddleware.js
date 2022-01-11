const authservice = require('../services/authService')
module.exports = async (req, res, next) =>{
    try{
        if(req.user){
            var auth = await authservice.findUser(req.user.USER)
            res.locals.user = auth
        }
    }catch (e){
        next(e)
    }
    next()
}