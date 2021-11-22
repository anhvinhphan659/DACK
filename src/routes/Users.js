var express = require('express');
var router = express.Router();

const UserController = require('../app/controllers/userController')
/* GET users listing. */


router.get('/:personal-page',UserController.personal)
router.get('/',UserController.index)



module.exports = router;
