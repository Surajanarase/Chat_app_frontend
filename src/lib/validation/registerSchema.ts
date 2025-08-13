import Joi from 'joi';

export const registerSchema = Joi.object({
  fullName: Joi.string()
    .min(2)
    .required()
    .messages({
      'string.empty': 'Full Name is required',
      'string.min': 'Full Name must be at least 2 characters'
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters'
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Please confirm your password'
    })
});
