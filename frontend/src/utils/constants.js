const page = document.querySelector('.page');

export const popupImageItem = document.querySelector('.popup_type_open-image');
export const popupImage = popupImageItem.querySelector('.popup__image');
export const popupTitle = popupImageItem.querySelector('.popup__image-title');

// кнопка открытия попап окна для редактирования профиля
export const profilEditBtn = page.querySelector('.profile__edit-button');

// поля ввода для редактирования профиля
export const inputName = page.querySelector('.popup__profile-edit_type_name');
export const inputDescription = page.querySelector('.popup__profile-edit_type_description');

// форма папапа редактирования профиля
export const formPopupProfileEdit = page.querySelector('.popup__form_type_edit');

// форма для добавления новой карточки
export const formPopupAddMesto = page.querySelector('.popup__form_type_add');

// popup окно добавления карточки
export const cardAddBtn = page.querySelector('.profile__add-button');

// кнопка открытия попап окна редактирования  аватара
export const avatarEditBtn = page.querySelector('.profile__avatar-btn');

export const formPopupChangeAvatar = page.querySelector('.popup__form_type-avatar');


export const cardListSelector = ".cards__list";

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__profile-edit',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__profile-edit_type_error',
  errorClass: 'popup__input-error_active'
};
