const express = require('express')
const router = express.Router();

const apiController = require('../app/controllers/apiController');

// router.get('/api/ton-kho', apiController.getCart);
router.get('/books/:bookID', apiController.getBook);
router.get('/dathang/:userid', apiController.getDatHang);



module.exports = router;