const express = require('express');
const router = express.Router();
const gifController = require('../controller/gifController')
const middleware = require('../middlewares/image')

router.get('/', gifController.findAll)
router.post('/', gifController.create)
router.post('/generate-tags', middleware.multer.single('image'), middleware.sendUploadToGCS, gifController.generateTags)
router.put('/:id', gifController.update)
router.delete('/:id', gifController.delete)

module.exports = router