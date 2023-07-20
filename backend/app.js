require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000, DB_CONNECT_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose
  .connect(DB_CONNECT_ADDRESS, {
    useNewUrlParser: true
  })
  .then(() => console.log('connected to db'))
  .catch(err => console.log(`Ошибка: ${err.message}`));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const validUrls = [
  'http://localhost:3000',
  'http://localhost:3002',
  'http://mesto.project.adg.nomoredomains.xyz/',
  'https://mesto.project.adg.nomoredomains.xyz/'
];

app.use(cors({ origin: validUrls }));
app.use(requestLogger);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .pattern(/\w+\@\w+\.\w+/),
      password: Joi.string().required()
    })
  }),
  login
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .pattern(/\w+\@\w+\.\w+/),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
      )
    })
  }),
  createUser
);

app.use((req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err && err.statusCode) res.status(err.statusCode).send({ message: err.message });
  else res.status(500).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
