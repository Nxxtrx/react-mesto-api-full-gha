import React from 'react';
import Card from './Card.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

export default function Main({cards, onCardLike, onCardDelete, onEditProfile, isAddPlacePopupOpen, isEditAvatarPopupOpen, onCardClick}) {

  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">

      <section className="profile">

        <div className="profile__avatar">
          <button className="profile__avatar-btn" onClick={isEditAvatarPopupOpen}>
            <img src={currentUser.avatar} className="profile__avatar-image" alt="Фотография профиля" />
          </button>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button className="profile__edit-button" onClick={onEditProfile} name="edit-prf-btn" type="button"></button>
        </div>

        <button className="profile__add-button" onClick={isAddPlacePopupOpen} name="add-prf-btn" type="button"></button>
      </section>

      <section className="cards" aria-label="Добавленный фотографии">
        <ul className="cards__list">
          {cards.map(item => <Card onCardLike={onCardLike} onCardDelete={onCardDelete} card={item} onCardClick={onCardClick} key={item._id}/>)}
        </ul>
      </section>

    </main>
  );
}
