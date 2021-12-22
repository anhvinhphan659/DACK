const express = require('express')
const router = express.Router();

const bookController = require('../app/controllers/bookController')

router.get('/allBooks',bookController.showAll);
router.get('/type/:id',bookController.showType);
router.get('/category/:id',bookController.showCategory);
router.get('/:id',bookController.show)
router.post('/:id/comment',bookController.inputcmt)
router.get('/:id/comment',bookController.showcmt)

module.exports = router