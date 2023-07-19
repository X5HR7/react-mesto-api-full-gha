const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3001, DB_CONNECT_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose
	.connect(DB_CONNECT_ADDRESS, {
		useNewUrlParser: true
	})
	.then(() => console.log('connected to db'))
	.catch(err => console.log(`Ошибка: ${err.message}`));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

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

app.use(errors());

app.use((err, req, res, next) => {
	if (err && err.statusCode) res.status(err.statusCode).send({ message: err.message });
	else res.status(500).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
