import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = props => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleNameChange = evt => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = evt => {
    setDescription(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    props.onUpdateUser({ name, about: description });
  };

  return (
    <PopupWithForm name='edit-profile' title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <input type='text' className='popup__input popup__input_type_name' id='name-input' onChange={handleNameChange} value={name || ''} placeholder='Имя' minLength='2' maxLength='40' required />
      <p className='popup__error name-input-error'></p>
      <input
        type='text'
        className='popup__input popup__input_type_profession'
        id='profession-input'
        onChange={handleDescriptionChange}
        value={description || ''}
        placeholder='Профессия'
        minLength='2'
        maxLength='200'
        required
      />
      <p className='popup__error profession-input-error'></p>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
