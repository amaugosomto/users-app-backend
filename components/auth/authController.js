const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const JWT = require('jsonwebtoken');

const user_model = require('../users/userModel')
const config = require('../../config');

const errorFormatter = ({msg}) => {
  return {msg};
};

const authControllers = {
  register: async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()){
      return res.status(403).send({ errors: errors.array() });
    }

    const salt_rounds = 10;
    const hash = await bcrypt.hash(req.body.password, salt_rounds);

    var create_user = {
      fullName: req.body.fullName,
      email: req.body.email.toLowerCase(),
      phoneNumber: req.body.phoneNumber,
      password: hash,
    }

    try {
      const user = await user_model.findOne({ email: create_user.email }, 'email');
      if (user) {
        return res.status(403).send({
          msg: "email already exists"
        });
      }

      const user_to_Save = new user_model(create_user);
      const user_saved = await user_to_Save.save();

      if (!user_saved) {
        return res.status(500).send({
          msg: "error in creating user"
        });
      }

      res.status(201).send({
        msg: 'User successfully created'
      });
          
    } catch (error) {
      res.status(500).send({
        msg: 'an error occurred, please contact admin'
      });
    }    
  },
  login: async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()){
      return res.status(422).send({ errors: errors.array() });
    }

    var email = req.body.email;
    var password = req.body.password;

    try {
      var user = await user_model.findOne({ email });
      if (!user) {
        return res.status(404).send({
          msg: "user not found"
        });
      }

      var compare_passwords = await bcrypt.compare(password, user.password);
      if (!compare_passwords) {
        return res.status(401).send({
          msg: "authentication failed"
        });
      }

      var token = JWT.sign({
        iss: 'IGofer',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
      }, config.login_key);

      if (!token) {
        return res.status(522).send({
          status: false,
          msg: 'please contact admin'
        });
      }

      const payload = {
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.fullName,
        token,
        id: user._id
      }

      return res.status(200).send({
        msg: "successfully logged in",
        payload
      });
    } catch (error) {
      res.status(500).send("An error occured, please contact admin");
    }
  }
}

module.exports = authControllers
