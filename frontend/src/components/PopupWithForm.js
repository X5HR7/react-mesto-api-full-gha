const PopupWithForm = props => {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button className='popup__button-close' type='button' onClick={props.onClose}></button>
        <h2 className='popup__title'>{props.title}</h2>
        <form name={`form-${props.name}`} className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit}>
          {props.children}
          <button className='popup__button-submit' type='submit'>
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
