const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCardList,
  createCard,
  deleteCard,
  setCardLike,
  deleteCardLike,
} = require('../controllers/card');

cardRouter.get('/', getCardList);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(/^https?:\/\/(w{3}\.)?[\w./-]+\.[\w./-]*(\/[\w._~:/?#[\]@!$&'()*+,;=-]*)?#?$/),
  }),
}), createCard);

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), setCardLike);

cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCardLike);

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteCard);

module.exports = cardRouter;
