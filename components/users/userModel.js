const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  password: {
    required: true,
    type: String
  }
}, {
  collection: 'Users',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Users = mongoose.model('User', userSchema);
module.exports = Users;