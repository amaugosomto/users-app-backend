require("dotenv").config();

module.exports = {
  mongo_url: process.env.MONGODB_URI,
  login_key: process.env.LOGIN_KEY
};