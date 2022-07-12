const express = require('express');
var router = express.Router();

const { validator: {
  full_name,
  email,
  password,
  phone_number
} } = require('./authMiddlewares')
const authController = require('./authController')

/* Register user */
router.post('/register', 
  full_name,
  email,
  password,
  phone_number,
  authController.register
);

module.exports = router;
