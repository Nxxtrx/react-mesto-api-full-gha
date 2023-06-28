import failRegistrImg from '../images/fail-registr.svg'
import successRegistrImg from '../images/success-registr.svg'

export default function InfoTooltip({isOpen, onClose, registrationStatus}) {
  return(
    <section className ={`popup popup_type_registr-info ${isOpen? 'popup_opened' : ''}`} aria-label="Информация об регистрации">
      <div className="popup__registr-container popup__overlay">
        <figure className="popup__figure">
          <img className="popup__status-image" src={registrationStatus ? successRegistrImg : failRegistrImg}  />
          <figcaption className="popup__status-title">{registrationStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</figcaption>
        </figure>
        <button type="button" className="popup__close" onClick={onClose} ></button>
      </div>
    </section>
  )
}
