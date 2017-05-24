var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/api/games', require('./games'));

router.get('/', function (req, res) {
  //BUILD??
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

router.get('/about', function(req, res){
  res.json({data: "All about Halo!"});
})

module.exports = router;