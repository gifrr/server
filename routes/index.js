const express = require('express');
const router = express.Router();
const gif = require('./gif')

router.use('/gifs', gif)

module.exports = router;