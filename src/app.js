const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const categori = require('./app/middlewares/categoryMiddelware');

const routes = require('./routes');



//app express
const app = express();


//setting handlebars

const hbs = exphbs.create({
    extname: '.hbs',
    
});


// view engine setup
app.engine('.hbs', hbs.engine)
app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', '.hbs');

app.use(categori);
// use logger and use read json , static file
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;