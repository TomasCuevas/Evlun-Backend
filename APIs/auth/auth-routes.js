/**
 * auth-routes
 * /api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

/**
 * @middlewares
 */
const { fieldsValidation, JWTValidation } = require('../../middleware');

/**
 * @helpers
 */
const { emailValidation, nameValidation, usernameValidation } = require('../../helpers');

/**
 * @controllers
 */
const { authLogin, authRefresh, authSignup } = require('./auth-controllers');

/**
 * @routes
 */
router.post(
  '/signup',
  [
    check(
      'name',
      'El nombre debe tener entre 2 y 25 caracteres. (Solo puede contener letras)',
    ).custom(nameValidation),
    check(
      'username',
      'El nombre de usuario debe tener entre 4 y 15 caracteres. (Solo puede tener letras, numeros y guiones)',
    ).custom(usernameValidation),
    check('email', 'El email ingresado no es valido.').custom(emailValidation),
    check('password', 'El password debe tener entre 8 y 30 caracteres.').isLength({
      min: 8,
      max: 30,
    }),
    fieldsValidation,
  ],
  authSignup,
);

router.post(
  '/login',
  [
    check('email', 'El email ingresado no es valido.').custom(emailValidation),
    check('password', 'El password debe tener entre 8 y 30 caracteres.').isLength({
      min: 8,
      max: 30,
    }),
    fieldsValidation,
  ],
  authLogin,
);

router.get(
  '/refresh',
  [
    check('x-token', 'El token ingresado no es un JsonWebToken valido.').isJWT(),
    fieldsValidation,
    JWTValidation,
  ],
  authRefresh,
);

module.exports = router;
