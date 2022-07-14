const {
  check
} = require("express-validator");

const validator = {
  fullName: [
    check("fullName")
    .not().isEmpty().withMessage("Full name must not be empty")
    .isString()
    .withMessage("Full name must be a string")
  ],
  password: [
    //[.matches] the string must contain 1 lowercase, 1 uppercase and must be six characters or longer
    check('password')
    .not().isEmpty().withMessage("password should not be empty")
    .matches("^(?=.*[A-Za-z])[A-Za-z\d]{6,}$")
    .withMessage("password must have 1 lowercase, 1 uppercase, and 8 characters long")
  ],
  email: [
    check('email')
    .not().isEmpty().withMessage("email cannot be blank")
    .normalizeEmail().isEmail().withMessage("please provide a valid email")
  ],
  phoneNumber: [
    check('phoneNumber')
    .not().isEmpty().withMessage("phone number cannot be empty")
    .isNumeric().withMessage("phone number should be numbers")
  ],
  login_password: [
    check('password')
    .not().isEmpty().withMessage("password should not be empty")
  ]
};

module.exports = { validator }
