const express = require('express');
const router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});

module.exports = router;
