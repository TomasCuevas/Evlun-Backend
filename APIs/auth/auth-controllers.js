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

const authSignup = async (req = request, res = response) => {
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
      user: {
        _id: user._id,
        avatar: user.avatar,
        date: user.date,
        email,
        followers: user.followers,
        followings: user.followings,
        name,
        username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const authLogin = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    // verificar que exista usuario con el email ingresado
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Datos incorrectos, no se pudo realizar el login.',
      });
    }

    // verificar contraseña
    const passwordVerify = bcryprjs.compareSync(password, user.password);
    if (!passwordVerify) {
      return res.status(400).json({
        ok: false,
        msg: 'Datos incorrectos, no se pudo realizar el login',
      });
    }

    // generar token
    const token = await generateJWT(user._id, user.username);

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      msg: 'login',
      token,
      user: {
        _id: user._id,
        avatar: user.avatar,
        date: user.date,
        email: user.email,
        followers: user.followers,
        followings: user.followings,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte con un administrador.',
    });
  }
};

const authRefresh = async (req = request, res = response) => {
  try {
    const { _id, username } = req;

    // generar nuevo token
    const token = await generateJWT(_id, username);

    // obtener usuario por id
    const user = await User.findById(_id);

    // respuesta al frontend
    res.status(200).json({
      ok: true,
      msg: 'refresh',
      token,
      user: {
        _id: user._id,
        avatar: user.avatar,
        date: user.date,
        email: user.email,
        followers: user.followers,
        followings: user.followings,
        name: user.name,
        username: user.username,
      },
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
  authLogin,
  authRefresh,
  authSignup,
};
