const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('./config/auth/passport')
const session = require('express-session');
const methodOverride = require('method-override')
const userOnline = require('./app/middlewares/userOnlineMiddleware')
const categori = require('./app/middlewares/categoryMiddleware');
const routes = require('./routes');



//app express
const app = express();


//setting handlebars

// const hbs = exphbs.create({
//     extname: '.hbs',

// });


// view engine setup
app.engine(
    '.hbs',
    exphbs.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars')
    })
);
app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', '.hbs');
// use logger and use read json , static file
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//init passport and session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

//use middlewares
app.use(userOnline)
app.use(categori);

//middleware method
app.use(methodOverride('_method'))


routes(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;