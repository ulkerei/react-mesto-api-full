const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserList,
  getUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

userRouter.get('/', getUserList);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), getUser);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[\w./-]+\.[\w./-]*(\/[\w._~:/?#[\]@!$&'()*+,;=-]*)?#?$/),
  }),
}), updateAvatar);

module.exports = userRouter;
