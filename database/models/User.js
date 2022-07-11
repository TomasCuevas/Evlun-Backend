const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.method('toJSON', function () {
  const { __v, password, object } = this.toObject();
  return object;
});

const User = model('users', UserSchema);

module.exports = User;
