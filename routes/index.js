var express = require('express');
var router = express.Router();
const models = require('../models');


router.get('/users', function(req, res, next) {
  models.User.findAll().then((allUsers)=>{
    res.json(allUsers)
  });
});

router.post('/users', function(req, res, next) {
  models.User.findAll().then((allUsers)=>{
    res.json(allUsers)
  });
});

module.exports = router;
