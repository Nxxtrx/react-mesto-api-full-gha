import React from "react"
import PopupWithForm from "./PopupWithForm"
import { useFormAndValidation } from "../hooks/useValidationInput";

export default function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const {values, errors, isValid, setIsValid, handleChange, resetForm} = useFormAndValidation()

  const {name, link} = values

  React.useEffect(() => {
    if(!name && !link){
      setIsValid(false)
    }
  }, [name, link])

  React.useEffect(() => {
    resetForm()
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name: name,
      link: link
    })

  }


  return (
    <PopupWithForm
      name={"add-item"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onDisabled={!isValid}
    >
      <input
        className="popup__profile-edit popup__profile-edit_type_title"
        type="text"
        id="picture-title"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name || ''}
        onChange={handleChange}
      />
      <span className="popup__input-error picture-title-error">{errors.name}</span>
      <input
        className="popup__profile-edit popup__profile-edit_type_src"
        type="url"
        id="picture-url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link || ''}
        onChange={handleChange}
      />
      <span className="popup__input-error picture-url-error">{errors.link}</span>
    </PopupWithForm>
  );
}
