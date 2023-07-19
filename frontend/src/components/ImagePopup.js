const ImagePopup = props => {
  return (
    <div className={`popup popup_type_image ${props.card ? 'popup_opened' : ''}`}>
      <div className='popup__container popup__container_type_image'>
        <button className='popup__button-close' type='button' onClick={props.onClose}></button>
        <img src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : ''} className='popup__image' />
        <p className='popup__caption'>{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
