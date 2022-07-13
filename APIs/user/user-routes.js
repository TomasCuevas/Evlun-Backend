/**
 * user-routes
 * /api/user
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
const { nameValidation, usernameValidation, emailValidation } = require('../../helpers');

/**
 * @controllers
 */
const { userSignup, followUser } = require('./user-controllers');

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
  userSignup,
);

router.post(
  '/follow',
  [
    check('id', 'El ID del usuario no es valido o no fue ingresado.').isMongoId(),
    JWTValidation,
    fieldsValidation,
  ],
  followUser,
);

module.exports = router;
