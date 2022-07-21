const { request, response } = require('express');

/**
 * @models
 */
const Post = require('../../database/models/Post');
const User = require('../../database/models/User');

const createPost = async (req = request, res = response) => {
  try {
    const { _id } = req;
    const { content } = req.body;

    // crear post
    const newPost = await Post({ content, added_by: _id, date: new Date().getTime() });
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

const getPost = async (req = request, res = response) => {
  try {
    const { id } = req.query;

    // obtener post
    const post = await Post.findById(id).populate('added_by', {
      avatar: true,
      id: true,
      name: true,
      username: true,
    });
    if (!post) {
      return res.status(400).json({
        ok: false,
        msg: 'No se encontro post con el ID ingresado.',
      });
    }

    res.status(200).json({
      ok: true,
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

const getUserPosts = async (req = request, res = response) => {
  try {
    const { id, limit = 20, skip = 0, lt } = req.query;

    // obtener posts del usuario
    const posts = await Post.find({ added_by: id, date: { $lt: lt } })
      .populate('added_by', {
        name: true,
        avatar: true,
        username: true,
        _id: true,
      })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const getAllPosts = async (req = request, res = response) => {
  try {
    const { limit = 20, skip = 0, lt } = req.query;

    // obtener los posts
    const posts = await Post.find({ date: { $lt: lt } })
      .populate('added_by', {
        username: true,
        name: true,
        avatar: true,
        _id: true,
      })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const getPostsByFollowings = async (req = request, res = response) => {
  try {
    const userId = req._id;
    const { limit = 20, skip = 0, lt } = req.query;

    // obtener usuario
    const user = await User.findById(userId);

    // obtenemos usuarios que sigue el usuario
    const usersFollowingsIds = user.followings.map((user) => user.toString());

    // obtener posts de los usuarios a los que sigue
    const posts = await Post.find({ added_by: { $in: usersFollowingsIds }, date: { $lt: lt } })
      .populate('added_by', {
        username: true,
        name: true,
        avatar: true,
        _id: true,
      })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      posts,
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
  getAllPosts,
  getPost,
  getPostsByFollowings,
  getUserPosts,
};
