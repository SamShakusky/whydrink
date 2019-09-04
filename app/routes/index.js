const express = require('express');
const router = express.Router();
var path = require('path');

router.get(/^(?!\/?api).+$/, function(req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});

module.exports = router;
