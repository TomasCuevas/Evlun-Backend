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
const { followUser, unfollowUser } = require('./user-controllers');
const differentIdsValidation = require('../../middleware/differentIdsValidation');

/**
 * @routes
 */
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
