const express = require('express');
const router = express.Router();
const gif = require('./gif')

router.use('/gif', gif)

module.exports = router;