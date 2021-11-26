const express = require('express')
const router = express.Router();

const bookController = require('../app/controllers/bookController')

router.get('/allBooks',bookController.showAll);
router.get('/novel',bookController.novel);
router.get('/comic',bookController.comic);
router.get('/:id',bookController.show)


module.exports = router