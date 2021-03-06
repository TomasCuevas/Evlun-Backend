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
  state: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    default:
      'https://res.cloudinary.com/dn3kl3egc/image/upload/v1636226226/Avatar/avatar_default.png',
  },
  date: {
    type: Number,
    required: true,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  followings: [{ type: Schema.Types.ObjectId, ref: 'users' }],
});

UserSchema.method('toJSON', function () {
  const { __v, password, state, object } = this.toObject();
  return object;
});

const User = model('users', UserSchema);

module.exports = User;
