const RouterAdmin = require('./Admin')
const RouterSite = require('./Site')
const RouterUsers = require('./Users')
const RouterBook = require('./Book')

function route(app){
    
    app.use('/books',RouterBook)
    app.use("/users",RouterUsers)
    app.use("/admin",RouterAdmin)  
    app.use('/',RouterSite)
}

module.exports = route