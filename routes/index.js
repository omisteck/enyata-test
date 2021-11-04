var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users');
const utilise = require('../controllers/utilise');


router.get('/users', usersController.getAllUsers);

router.post('/users', 
  utilise.validate('createUser'),
  usersController.createUser
);

router.delete(
  '/users/:id',
  usersController.destory
);

router.put(
  '/users/:id',
  utilise.validate('createUser'),
  usersController.update
);

router.get(
  '/users/:id',
  utilise.validate('auth'),
  usersController.getSingleUser
);

module.exports = router;
