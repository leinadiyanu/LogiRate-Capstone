import Joi from 'joi';

export const registerValidation = Joi.object({
  firstName: Joi.string().min(3).required(),
  surname: Joi.string().allow(''),
  email: Joi.string().email().required(),
  address: Joi.string().allow(''),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .label('Confirm password')
    .messages({
      'any.only': '{#label} does not match password',
    })
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const resetPasswordValidation = Joi.object({
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .label('Confirm password')
    .messages({
      'any.only': '{{#label}} does not match password',
    }),
});