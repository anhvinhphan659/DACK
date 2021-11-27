const express = require('express')
const router = express.Router();

const bookController = require('../app/controllers/bookController')

router.get('/allBooks',bookController.showAll);
router.get('/type/:id',bookController.showType);
router.get('/category/:id',bookController.showCategory);
router.get('/:id',bookController.show)


module.exports = router