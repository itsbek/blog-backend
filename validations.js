import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be longer than 5 charecters').isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be longer than 5 charecters').isLength({
    min: 5,
  }),
  body('fullName', 'Insert your name').isLength({ min: 3 }),
  body('avatarUrl', 'Invalid link for avatar').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Enter title').isString(),
  body('text', 'Blog post body cannot be empty!')
    .isLength({
      min: 10,
    })
    .isString(),
  body('tags', 'Invalid tag format').optional().isString(),
  body('imageUrl', 'Invalid image link').optional().isString(),
];
