
const { body } = require('express-validator');
const models = require('../models');

exports.responseFormat = (obj = {}) => {
    let {message, data, status} = obj
    return {
        'status' : status,
        message,
        data
    }
};


exports.validate = (method) => {
    switch (method) {
      case 'createUser': {
       return [ 
            body('email').isEmail(),
            body('email').custom(value => {
            return models.User.findOne({ where: { email: value } }).then(user => {
                if (user) {
                return Promise.reject('E-mail already in use');
                }
            });
            }),
            body('name').not().isEmpty(),
            body('password').isLength({ min: 5 })
         ]   
      }
      break
      case 'auth' : {
        return [ 
            body('email').isEmail(),
            body('password').not().isEmpty(),
         ] 
      }
      break
    }
  }