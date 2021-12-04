module.exports = (req, res, next) =>{
    try{
        res.locals.user = req.user;
    }catch (e){
        next(e)
    }
    next()
}