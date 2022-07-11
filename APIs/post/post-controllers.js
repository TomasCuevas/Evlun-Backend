const { request, response } = require('express');

/**
 * @models
 */
const Post = require('../../database/models/Post');

const createPost = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { content } = req.body;

    // crear post
    const newPost = await Post({ content, added_by: _id });
    await newPost.save();

    // tomar post creado
    const post = await Post.findById(newPost._id).populate('added_by', {
      name: true,
      avatar: true,
      username: true,
      _id: true,
    });

    // respuesta al frontend
    res.status(201).json({
      ok: true,
      msg: 'created',
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

module.exports = {
  createPost,
};
