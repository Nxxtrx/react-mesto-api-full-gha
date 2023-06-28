export default function ImagePopup({card, onClose, isOpen}) {
  return (
    <section className ={` popup popup_type_open-image ${isOpen? 'popup_opened' : ''}`} aria-label="Открытие картинок">
      <div className="popup__image-container popup__overlay">
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__image-title">{card.name}</figcaption>
        </figure>
        <button type="button" className="popup__close popup__close_image" onClick={onClose}></button>
      </div>
    </section>
  )
}
