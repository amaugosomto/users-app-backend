const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
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