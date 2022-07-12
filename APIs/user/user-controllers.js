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

module.exports = {
  userSignup,
};
