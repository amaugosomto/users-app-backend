var express = require('express');
var router = express.Router();
const passport = require('passport');
require("../../middlewares/passport");

const userController = require("./userControllers")

/* GET users listing. */
router.get('/', passport.authenticate('jwt', {session: false}), userController.getUsers);

module.exports = router;
