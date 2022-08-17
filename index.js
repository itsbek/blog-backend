import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import dotenv from 'dotenv';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';
dotenv.config();

mongoose
  .connect(
    'mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.2bcvsl1.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB ok');
  })
  .catch((err) => {
    console.log('something went wrong...', err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.get('/auth/me', checkAuth, UserController.getMe);

app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  handleValidationErrors,
  PostController.update
);

app.post(
  '/upload',
  checkAuth,
  postCreateValidation,
  upload.single('image'),
  (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  }
);
app.listen(4444, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log('app listening on port 4444!');
});
