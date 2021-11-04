
const models = require('../models');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { responseFormat } = require('./utilise');


// get all users record
exports.getAllUsers = (req, res, next) => {
    models.User.findAll().
    then(data => res.json(data) );
}
// get a single user
exports.getSingleUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

        models.User.findOne({
        where: {
         id: req.params.id 
        }
        }).then( (data) => {

            if (!data || !bcrypt.compareSync(req.body.password, data.password)) {
                res.json(responseFormat({
                    message: 'invalid user email and password',
                    status: false
                }) )
            } else {
                res.json(responseFormat({
                    data,
                    status: true
                }) )
            }
         })
}

// create a new user
exports.createUser = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt =  bcrypt.genSaltSync(10, 'a');
    hashPassword = bcrypt.hashSync(req.body.password, salt);

    const User = models.User.build({
      email : req.body.email,
      name : req.body.name,
      password : hashPassword
    })

    User.save().then(
        data => 
        res.json( responseFormat({
            message : 'User Created successfully',
            data,
            status: true
        }) ) 
    );
  }

// delete user record
exports.destory = (req, res, next) => {
    models.User.destroy({
        where: {
          id: req.params.id
        }
      }).then( response =>{
          if(response == 0){
            res.json(responseFormat({message: 'Invalid user ID', status:false}))
          }else{
            res.json(responseFormat({message: 'User deleted successfully', status:true }))
          }
      } 
         );
  }

  // update user record
  exports.update = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt =  bcrypt.genSaltSync(10, 'a');
    hashPassword = bcrypt.hashSync(req.body.password, salt);

    const User = models.User.update({
      email : req.body.email,
      name : req.body.name,
      password : hashPassword
    },{
        where: {
          id: req.params.id
        }
      }).then( data =>{
        if(data == 0){
            res.json(responseFormat({message: 'Invalid user ID', status:false}))
        }else{
            res.json(responseFormat({message: 'User successfully updated', status:true }))
        }
      });
  }