const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  added_by: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  comments: {
    type: Array,
    default: [],
  },
});

PostSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

const Post = model('posts', PostSchema);

module.exports = Post;
