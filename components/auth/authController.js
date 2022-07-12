const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const user_model = require('../users/userModel')

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
      full_name: req.body.full_name,
      email: req.body.email.toLowerCase(),
      phone_number: req.body.phone_number,
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
  }
}

module.exports = authControllers
