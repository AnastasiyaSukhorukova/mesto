// переменные попапов 
const popupEdit = document.querySelector('.profile-popup');
const popupAdd = document.querySelector('.popup-add');

// кнопки по открытию попапов
export const buttonEditOpen = document.querySelector('.profile__button-edit');
export const buttonAddOpen = document.querySelector('.profile__button-add');

// кнопки по закрытию попапов 
export const buttonCloseEdit = popupEdit.querySelector('.popup__close'); 
export const buttonCloseAdd = popupAdd.querySelector('.popup__close'); 

// переменные для хранения информации в попапах и формах

export const profileForm = document.querySelector('.popup__edit-form');
export const formElementAdd = document.querySelector('.popup__add-form');

// инпуты внутри попапов и формы
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');

export const formInputCardName = document.querySelector('.popup__input_type_title');
export const formInputCardLink = document.querySelector('.popup__input_type_link');

// переменные для удаления карточек
export const elementDelete = document.querySelector('.element__delete');

// переменные для добавления новых карточек
export const cardsContainer = document.querySelector('.elements');

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

// валидация форм
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
}
