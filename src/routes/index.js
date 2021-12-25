const RouterSite = require('./Site')
const RouterUsers = require('./Users')
const RouterBook = require('./Book')
const RouterCart = require('./Cart');
const RouterAPI = require('./api');

function route(app) {

    app.use('/books', RouterBook)
    app.use("/users", RouterUsers)
    app.use("/shopping-cart", RouterCart);
    app.use("/api", RouterAPI);
    app.use('/', RouterSite)
}

module.exports = route