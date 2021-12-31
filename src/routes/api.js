const express = require('express')
const router = express.Router();

const apiController = require('../app/controllers/apiController');

// router.get('/api/ton-kho', apiController.getCart);
router.get('/books/:bookID', apiController.getBook);
router.get('/dathang/:userid', apiController.getDatHang);
router.get("/dathang/:userid/:bookid", apiController.getBookInCurrentCart);
router.post("/dathang/:userid/:bookid", apiController.removeBookInCart);



module.exports = router;