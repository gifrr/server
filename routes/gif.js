const express = require('express');
const router = express.Router();
const gifController = require('../controller/gifController')

router.get('/', gifController.findAll)
router.post('/', gifController.create)
router.post('/generate-tags', gifController.generateTags)
router.put('/:id', gifController.update)
router.delete('/:id', gifController.delete)

module.exports = router