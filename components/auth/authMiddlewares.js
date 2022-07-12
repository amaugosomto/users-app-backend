const {
  check
} = require("express-validator");

const validator = {
  full_name: [
    check("full_name")
    .not().isEmpty().withMessage("Full name must not be empty")
    .isString()
    .withMessage("Full name must be a string")
  ],
  password: [
    //[.matches] the string must contain 1 lowercase, 1 uppercase, 1 numeric character
    // 1 special character and must be eight characters or longer
    check('password')
    .not().isEmpty().withMessage("password should not be empty")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})")
    .withMessage("password must have 1 lowercase, 1 uppercase, 1 special character and 8 characters long"),
    check('confirm_password', 'password confirmation field must have the same value as the password field')
    .not().isEmpty().withMessage("confirm password should not be empty")
    .custom((value, {
      req
    }) => value === req.body.password)
  ],
  email: [
    check('email')
    .not().isEmpty().withMessage("email cannot be blank")
    .normalizeEmail().isEmail().withMessage("please provide a valid email")
  ],
  phone_number: [
    check('phone_number')
    .not().isEmpty().withMessage("phone number cannot be empty")
    .isNumeric().withMessage("phone number should be numbers")
  ],
  login_password: [
    check('password')
    .not().isEmpty().withMessage("password should not be empty")
  ]
};

module.exports = { validator }
