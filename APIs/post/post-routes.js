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
  getPost,
} = require('./post-controllers');

/**
 * @routes
 */

// post
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

// get post
router.get(
  '/',
  [check('id', 'El ID del post es necesario.').isMongoId(), fieldsValidation],
  getPost,
);

// get profile posts
router.get(
  '/user',
  [check('id', 'El ID del usuario es requerido.').isMongoId(), fieldsValidation],
  getUserPosts,
);

// get all posts
router.get('/all', [JWTValidation], getAllPosts);

// get followings posts
router.get('/followings', [JWTValidation], getPostsByFollowings);

module.exports = router;
