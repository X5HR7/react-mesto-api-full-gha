import React from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = props => {
  const avatarRef = React.useRef();

  const handleSubmit = evt => {
    evt.preventDefault();

    props.onUpdateAvatar({avatar: avatarRef.current.value});
  };

  return (
    <PopupWithForm name='update-avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <input ref={avatarRef} type='url' className='popup__input popup__input_type_update-avatar' id='avatar-input' placeholder='Ссылка на аватар' required />
      <p className='popup__error avatar-input-error'></p>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
