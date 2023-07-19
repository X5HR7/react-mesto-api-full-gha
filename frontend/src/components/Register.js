import Form from './Form';
import Header from './Header';
import { Link } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import React from 'react';
import auth from '../utils/Auth';

const Register = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isRegisterFailed, setRegisterFailed] = React.useState(false);
  const [isInfoTooltipOpened, setInfoTooltipOpened] = React.useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();

    auth
      .register(password, email)
      .then(data => {
        setRegisterFailed(false);
        setEmail('');
        setPassword('');
      })
      .catch(err => {
        setRegisterFailed(true);
        console.log(`Ошибка: ${err.status}`);
      })
      .finally(() => setInfoTooltipOpened(true));
  };

  const handleEmailChange = evt => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = evt => {
    setPassword(evt.target.value);
  };

  const handlePopupClose = () => {
    setInfoTooltipOpened(false);
  };

  return (
    <>
      <InfoTooltip name='infoTooltip' successText='Вы успешно зарегистрировались!' isFailed={isRegisterFailed} isOpen={isInfoTooltipOpened} onClose={handlePopupClose} />
      <Header>
        <Link to='/sign-in' className='header__link'>
          Войти
        </Link>
      </Header>
      <section className='register'>
        <h1 className='register__title'>Регистрация</h1>
        <Form name='register' buttonText='Зарегистрироваться' onSubmit={handleSubmit}>
          <input type='email' onChange={handleEmailChange} value={email} className='form__input' placeholder='Email' required />
          <input type='password' onChange={handlePasswordChange} value={password} className='form__input' placeholder='Пароль' required />
        </Form>
        <Link to='/sign-in' className='register__link'>
          Уже зарегистрированы? Войти
        </Link>
      </section>
    </>
  );
};

export default Register;
