var express = require('express');
var router = express.Router();
const gifController = require('../controller/gifController')



router.get('/', gifController.all)
router.post('/create', gifController.create)
router.delete('/delete/:id', gifController.remove)
router.put('/edit/:id', gifController.edit)
module.exports = router