import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = props => {
  const user = React.useContext(CurrentUserContext);

  return (
    <article className='element'>
      {props.card.owner === user._id ? <button className='element__button-remove' type='button' onClick={() => props.onCardDelete(props.card)} /> : ''}
      <img src={props.card.link} alt={props.card.name} className='element__photo' onClick={() => props.onCardClick(props.card)} />
      <h2 className='element__title'>{props.card.name}</h2>
      <div className='element__like'>
        <button className={`element__button-like ${props.card.likes.some(i => i === user._id) ? 'element__button-like_active' : ''}`} type='button' onClick={() => props.onCardLike(props.card)} />
        <p className='element__like-amount'>{props.card.likes.length}</p>
      </div>
    </article>
  );
};

export default Card;
