/**
 * post-routes
 * /api/post
 */
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

/**
 * @middleware
 */
const { fieldsValidation, JWTValidation } = require('../../middleware');

/**
 * @controllers
 */
const {
  createPost,
  getAllPosts,
  getPostsByFollowings,
  getUserPosts,
} = require('./post-controllers');

/**
 * @routes
 */
router.post(
  '/create',
  [
    check('content', 'El contenido del post debe tener entre 1 y 155 caracteres.').isLength({
      min: 1,
      max: 155,
    }),
    JWTValidation,
    fieldsValidation,
  ],
  createPost,
);

router.get(
  '/',
  [check('id', 'El ID del usuario es requerido.').isMongoId(), fieldsValidation],
  getUserPosts,
);

router.get('/all', [JWTValidation], getAllPosts);

router.get('/followings', [JWTValidation], getPostsByFollowings);

module.exports = router;
