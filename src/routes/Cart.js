const express = require('express')
const router = express.Router();
const CartController = require('../app/controllers/CartController');


router.get('/', CartController.cart);
router.post('/', CartController.addToCart);
router.post('/payment', CartController.payCart);
router.get("/payment", CartController.getpayCart);


module.exports = router