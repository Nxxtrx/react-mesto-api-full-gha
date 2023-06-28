import React from "react";
import PopupWithForm from "./PopupWithForm"
import { useFormAndValidation } from "../hooks/useValidationInput";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const {values, errors, isValid, setIsValid, handleChange, resetForm} = useFormAndValidation()

  const {avatarLink} = values

  React.useEffect(() => {
    if(!avatarLink) {
      setIsValid(false)
    }
  }, [avatarLink])

  React.useEffect(() => {
    resetForm()
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarLink
    })
  }

  return (
    <PopupWithForm
      name={"change-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onDisabled={!isValid}
    >
      <input
        className="popup__profile-edit popup__profile-edit_type_src"
        type="url"
        name="avatarLink"
        id="avatar-url"
        placeholder="Ссылка на картинку"
        required
        value={avatarLink || ''}
        onChange={handleChange}
      />
      <span className="popup__input-error avatar-url-error">{errors.avatarLink}</span>
    </PopupWithForm>
  );
}

