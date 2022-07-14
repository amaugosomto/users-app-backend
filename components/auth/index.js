const express = require('express');
var router = express.Router();

const { validator: {
  fullName,
  email,
  password,
  phoneNumber,
  login_password
} } = require('./authMiddlewares')
const authController = require('./authController')

/* Register user API with validators and controller */
router.post('/register', 
  fullName,
  email,
  password,
  phoneNumber,
  authController.register
);

/* login user API with validators and controller */
router.post('/login', 
  email,
  login_password,
  authController.login
)

module.exports = router;
