var express = require('express');
var router = express.Router();

const UserController = require('../app/controllers/userController')
    /* GET users listing. */


router.get('/:username', UserController.personal)
router.put('/:username/edit', UserController.edit)
router.get('/', UserController.index)



module.exports = router;