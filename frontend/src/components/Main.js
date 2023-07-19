import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = props => {
  const user = React.useContext(CurrentUserContext);

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__avatar-container' onClick={props.onEditAvatar}>
          <div className='profile__avatar-overlay'></div>
          <img src={user.avatar} alt='Аватар' className='profile__avatar' />
        </div>
        <div className='profile__info'>
          <h1 className='profile__name'>{user.name}</h1>
          <p className='profile__profession'>{user.about}</p>
        </div>
        <button className='profile__edit-button' type='button' onClick={props.onEditProfile}></button>
        <button className='profile__add-button' type='button' onClick={props.onAddPlace}></button>
      </section>

      <section className='elements'>
        {props.cards.map(card => (
          <Card key={card._id} card={card} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
};

export default Main;
