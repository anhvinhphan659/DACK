const express = require('express')
const router = express.Router();

const SiteController = require('../app/controllers/siteController')

router.get('/:shopping-cart',SiteController.cart)
router.get('/:login',SiteController.login)
router.get('/:signup',SiteController.signup)
router.get('/:search',SiteController.search)
router.get('/',SiteController.index)


module.exports = router