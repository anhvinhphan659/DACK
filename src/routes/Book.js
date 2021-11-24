const express = require('express')
const router = express.Router();

const bookController = require('../app/controllers/bookController')


router.get('/book-detail',bookController.show)


module.exports = router