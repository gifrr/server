const router = require('express').Router()
const gifController = require('../controller/gifController')

router.get('/', gifController.findAll)
router.put('/:id', gifController.update)
router.delete('/:id', gifController.delete)

module.exports = router