/**
 * user-following-routes
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
 * @controllers
 */
const { followUser, unfollowUser, getUser } = require('./user-controllers');
const differentIdsValidation = require('../../middleware/differentIdsValidation');

/**
 * @routes
 */
router.get(
  '/',
  [check('username', 'El nombre de usuario es requerido.').not().isEmpty(), fieldsValidation],
  getUser,
);

router.post(
  '/follow',
  [
    check('id', 'El ID del usuario no es valido o no fue ingresado.').isMongoId(),
    JWTValidation,
    differentIdsValidation,
    fieldsValidation,
  ],
  followUser,
);

router.post(
  '/unfollow',
  [
    check('id', 'El ID del usuario no es valido o no fue ingresado.').isMongoId(),
    JWTValidation,
    differentIdsValidation,
    fieldsValidation,
  ],
  unfollowUser,
);

module.exports = router;
