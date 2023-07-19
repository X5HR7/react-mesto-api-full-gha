import failedIcon from '../images/icon_failed.svg';
import doneIcon from '../images/icon_done.svg';

const InfoTooltip = props => {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button className='popup__button-close' type='button' onClick={props.onClose}></button>
        <img src={props.isFailed ? failedIcon : doneIcon} alt={props.name} className='popup__icon' />
        <h2 className='popup__title popup__title_type_info-tooltip'>{props.isFailed ? 'Что-то пошло не так! Попробуйте ещё раз.' : props.successText}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
