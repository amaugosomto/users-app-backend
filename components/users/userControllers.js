const user_model = require('../users/userModel')

const authControllers = {
  getUsers: async(req, res) => {
    try {
      const users = await user_model.find()

      return res.status(200).send({
        msg: 'Success',
        payload: users
      })
    } catch (error) {
      res.status(500).send({
        msg: 'an error occurred, please contact admin'
      });
    }
    
  }
}

module.exports = authControllers
