import logo from '../images/logo.svg';


const Header = (props) => {
  return (
    <header className='header'>
      <img src={logo} alt='Логотип' className='header__logo' />
      <div className="header__text">
        {props.children}
      </div>
    </header>
  );
};

export default Header;