const express = require('express')
const router = express.Router();

const adminController = require('../app/controllers/adminController')

 router.get('/:receipt-detail',adminController.receiptD)
 router.get('/:order-detail',adminController.OrderD)
 router.get('/:input-order',adminController.InputO)
router.get('/:stock-manager',adminController.stockM)
router.get('/:order-manager',adminController.orderM)
router.get('/:receipt-manager',adminController.receiptM)
router.get('/:account-manager',adminController.accountM)
router.get('/',adminController.accountM)
module.exports = router