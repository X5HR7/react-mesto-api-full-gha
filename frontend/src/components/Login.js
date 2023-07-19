import Form from './Form';
import Header from './Header';
import InfoTooltip from './InfoTooltip';
import React from 'react';
import auth from '../utils/Auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoginFailed, setLoginFailed] = React.useState(false);
  const [isInfoTooltipOpened, setInfoTooltipOpened] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = evt => {
    evt.preventDefault();

    auth
      .login(password, email)
      .then(data => {
        localStorage.setItem('jwt', data.data);
        props.handleLogin();
        navigate('/', { replace: true });
      })
      .catch(err => {
        setLoginFailed(true);
        setInfoTooltipOpened(true);
        console.log(`Ошибка: ${err.status}`);
      });
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
      <InfoTooltip name='infoTooltip' successText='Вы успешно вошли!' isFailed={isLoginFailed} isOpen={isInfoTooltipOpened} onClose={handlePopupClose} />
      <Header>
        <Link to='/sign-up' className='header__link'>
          Регистрация
        </Link>
      </Header>
      <section className='login'>
        <h1 className='login__title'>Вход</h1>
        <Form name='login' buttonText='Войти' onSubmit={handleSubmit}>
          <input type='email' onChange={handleEmailChange} value={email} className='form__input' placeholder='Email' required />
          <input type='password' onChange={handlePasswordChange} value={password} className='form__input' placeholder='Пароль' required />
        </Form>
      </section>
    </>
  );
};

export default Login;
