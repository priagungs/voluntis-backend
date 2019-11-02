const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const router = require('express').Router();
const User = require('../models/User');

router.post('/login', async function(req, res) {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });
    user.password = undefined;
    res.status(200).send({ 
      status: 200, 
      message: 'Success', 
      data: {
        user,
        token
      }
    });
  } else {
    res.status(401).send({
      status: 401,
      message: 'Email or password wrong',
      data: null
    });
  }
});

router.post('/register', function(req, res) {
  
  let hashedPassword = bcrypt.hashSync(req.body.password, 8);
  console.log(hashedPassword);

  User.create({
    name : req.body.name,
    email : req.body.email,
    avatar: req.body.avatar,
    phone: req.body.phone,
    address: req.body.address,
    password : hashedPassword
  },
  (err, user) => {
    if (err) return res.status(500).send({
      status: 500,
      message: err.message,
      data: null
    });
    let token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });
    user.password = undefined;
    res.status(200).send({ 
      status: 200, 
      message: 'Success', 
      data: {
        ...user._doc,
        token
      }
    });
  }); 
});

module.exports = router;