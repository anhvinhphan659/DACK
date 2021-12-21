var express = require('express');
var router = express.Router();
const upload = require('../config/uploadIMG/multer')
const UserController = require('../app/controllers/userController')
    /* GET users listing. */


router.get('/:username', UserController.personal)
router.put('/:username/edit',upload.single('file'), UserController.edit)
router.get('/', UserController.index)



module.exports = router;