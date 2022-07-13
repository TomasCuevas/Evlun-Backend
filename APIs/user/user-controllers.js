const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

/**
 * @models
 */
const User = require('../../database/models/User');

/**
 * @helpers
 */
const { generateJWT } = require('../../helpers');

const userSignup = async (req = request, res = response) => {
  try {
    const { name, username, email, password, ...anyother } = req.body;

    // verificar que el email no haya sido registrado previamente
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: 'El email ingresado ya ha sido registrado.',
      });
    }

    // verificar que el usuario no exista
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ingresado ya se encuentra utilizado.',
      });
    }

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);

    // generar usuario
    const newUser = {
      name,
      username,
      email,
      password: encryptedPassword,
      date: new Date().getTime(),
    };
    const user = await new User(newUser);
    await user.save();

    // generar token
    const token = await generateJWT(user._id, user.name);

    // respuesta al frontend
    res.status(201).json({
      ok: true,
      msg: 'signup',
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const followUser = async (req = request, res = response) => {
  try {
    const userToFollowId = req.query.id;
    const userId = req._id;

    // buscar usuario por el id en la base de datos
    const userToFollow = await User.findById(userToFollowId);
    if (!userToFollow) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe usuario con el ID ingresado.',
      });
    }

    // validar que no se siga al usuario previamente
    const alreadyFollow = userToFollow.followers.find((id) => {
      if (id.toString() === userId) return true;
    });
    if (alreadyFollow) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya sigues al usuario indicado.',
      });
    }

    // agregar ID a la coleccion followers
    userToFollow.followers.push(userId);
    userToFollow.save();

    // agregar ID a la coleccion followings
    const followingUser = await User.findById(userId);
    followingUser.followings.push(userToFollowId);
    followingUser.save();

    // respuesta al frontend
    res.status(201).json({
      ok: true,
      msg: 'Follow.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const unfollowUser = async (req = request, res = response) => {
  try {
    const userId = req._id;
    const unfollowUserId = req.query.id;

    // buscar usuario por ID en la base de datos
    const unfollowUser = await User.findById(unfollowUserId);
    if (!unfollowUser) {
      return res.status(400).json({
        ok: false,
        msg: 'No existe usuario con el ID ingresado.',
      });
    }

    // validar que siga al usuario previamente
    const alreadyFollow = unfollowUser.followers.find((id) => {
      if (id.toString() === userId) return true;
    });
    if (!alreadyFollow) {
      return res.status(400).json({
        ok: false,
        msg: 'No sigues al usuario indicado..',
      });
    }

    // quitar ID a la coleccion followers
    const newFollowers = unfollowUser.followers.filter((id) => id.toString() !== userId);
    unfollowUser.followers = newFollowers;
    unfollowUser.save();

    // quitar ID a la coleccion followings
    const followingUser = await User.findById(userId);
    const newFollowings = followingUser.followings.filter((id) => id.toString() !== unfollowUserId);
    followingUser.followings = newFollowings;
    followingUser.save();

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      msg: 'Unfollow.',
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
  userSignup,
  followUser,
  unfollowUser,
};
