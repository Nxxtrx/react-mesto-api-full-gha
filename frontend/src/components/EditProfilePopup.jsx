import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm"
import { useFormAndValidation } from "../hooks/useValidationInput";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

  const {values, errors, isValid, handleChange, setValues} = useFormAndValidation()

  const {userName, description} = values

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if(isOpen) {
      setValues({userName: currentUser.name, description: currentUser.about})
    }

  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser({
      name: userName,
      about: description,
    })
  }

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактирование профиля"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onDisabled={!isValid}
    >

      <input
        type="text"
        className="popup__profile-edit popup__profile-edit_type_name"
        id="profile-name"
        name="userName"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={userName || ''}
        onChange={handleChange}
      />

      <span className="popup__input-error profile-name-error">{errors.userName}</span>

      <input
        className="popup__profile-edit popup__profile-edit_type_description"
        type="text"
        id="profile-description"
        name="description"
        placeholder="Описание"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleChange}
      />

      <span className="popup__input-error profile-description-error">{errors.description}</span>

    </PopupWithForm>
  );
}
