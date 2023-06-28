import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"


export default function Card({onCardLike, onCardDelete, card, onCardClick}) {

  const currentUser = React.useContext(CurrentUserContext)

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id)
  const cardLikeButtonClassName = (`cards__like-btn ${isLiked && 'cards__like-btn_active'}`)

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  function handleClick() {
    onCardClick(card)
  }
    return (
      <li className="cards__item">
        {isOwn && <button className="cards__delete-btn" type="button" onClick={handleDeleteClick} />}
        <img className="cards__image" alt={card.name} src={card.link} onClick={handleClick}/>
        <div className="cards-description">
          <h2 className="cards__subtitle">{card.name}</h2>
          <div className="cards__like-container">
           <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
            <p className="cards__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
    )
}
