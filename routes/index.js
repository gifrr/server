var express = require('express');
var router = express.Router();
const gif = require('./gif')
/* GET home page. */
router.use('/gif', gif)

module.exports = router;