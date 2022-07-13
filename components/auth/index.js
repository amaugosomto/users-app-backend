const express = require('express');
var router = express.Router();

const { validator: {
  full_name,
  email,
  password,
  phone_number,
  login_password
} } = require('./authMiddlewares')
const authController = require('./authController')

/* Register user API with validators and controller */
router.post('/register', 
  full_name,
  email,
  password,
  phone_number,
  authController.register
);

/* login user API with validators and controller */
router.post('/login', 
  full_name,
  login_password,
  authController.login
)

module.exports = router;
