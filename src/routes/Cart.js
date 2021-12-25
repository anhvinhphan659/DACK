const express = require('express')
const router = express.Router();
const CartController = require('../app/controllers/CartController');


router.get('/', CartController.cart);
router.post('/', CartController.addToCart);
router.post('/payment-cart', CartController.payCart);


module.exports = router