
export default function PopupWithForm({name, title, children, isOpen, onClose, onSubmit, isLoading, onDisabled}) {


  return (
    <section className={`popup popup_type_${name} ${isOpen? 'popup_opened' : ''}` } aria-label="Редактирование профиля">
      <div className= {`popup__container popup__container_type_${name} popup__overlay`}>
        <h3 className="popup__title">{title}</h3>
        <form className= {`popup__form popup__form_type_${name}`} name={name} noValidate onSubmit={onSubmit}>
          {children}
          <button className= {`popup__btn popup__btn-submit ${onDisabled ? 'popup__btn_inactive' : ''}`}  type="submit" disabled={onDisabled} >{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
        </form>
        <button type="button" className="popup__close" onClick={onClose} ></button>
      </div>
    </section>
  )
}

