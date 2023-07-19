import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = props => {
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');

  React.useEffect(() => {
    setTitle('');
    setUrl('');
  }, [props.isOpen]);

  const handleTitleChange = evt => {
    setTitle(evt.target.value);
  };

  const handleUrlChange = evt => {
    setUrl(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    props.onCardAdd({title, url});
  };

  return (
    <PopupWithForm name='add-card' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Создать'>
      <input type='text' className='popup__input popup__input_type_place-title' id='place-title-input' onChange={handleTitleChange} value={title} placeholder='Название' minLength='2' maxLength='30' required />
      <p className='popup__error place-title-input-error'></p>
      <input type='url' className='popup__input popup__input_type_image-src' id='place-url-input' onChange={handleUrlChange} value={url} placeholder='Ссылка на картинку' required />
      <p className='popup__error place-url-input-error'></p>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
