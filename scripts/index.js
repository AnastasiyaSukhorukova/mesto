import {Card} from './Card.js'
import {enableValidation} from './validate.js'
// переменные попапов 
const popupEdit = document.querySelector('.profile-popup');
const popupAdd = document.querySelector('.popup-add');
const popupImg = document.querySelector('.popup-image');

// открытие попапов
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

// закрытие попапов
const profileCloseButton = popupEdit.querySelector('.popup__close');
const closeElementAdd = popupAdd.querySelector('.popup__close');
const closeBigImg = popupImg.querySelector('.popup__close');

// переменные для хранения информации в попапах и формах
const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const formInputCardName = document.querySelector('.popup__input_type_title');
const formInputCardLink = document.querySelector('.popup__input_type_link');
const saveButton = document.querySelector('.popup__save');
const userName = document.querySelector('.profile__intro-title');
const userJob = document.querySelector('.profile__intro-subtitle');
 const titleImg = document.querySelector('.popup-image__title');
 const bigImg = document.querySelector('.popup-image__img');

// переменные для добавления новых карточек
const elementCards = document.querySelector('.elements');
const formElementAdd = document.querySelector('.popup__add-form');
const inputAdd = document.querySelector('.popup__add-input');
const buttonDel = document.querySelector('.element__delete');

const initialCards = [
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

// открытие попапов
function openPopupClass(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupClassEsc);
}

// закрытие попапов
function closePopupClass(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupClassEsc);
}

// закрытие попапов по Esc
function closePopupClassEsc(evt, popupEsc) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopupClass(popupOpened);
  }
}

// закрытие попапов кликом на оверлей - она должна быть в глобальной области 
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopupClass(evt.target);
  }
}

// функция отправки формы с инф-цией профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopupClass(popupEdit);
}

// функция по открытию попапа с картинкой 
  function openBidImg(name, link) {
    bigImg.src = link;
    bigImg.alt = name;
    titleImg.textContent = name;
    openPopupClass(popupImg);
  }

// функция которая добавляет карточки в начало элемента elements 
function renderCard(name,link) {
  const card = new Card (name, link, openBidImg);
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
}

// с помощью forEach перебираем массив 
 initialCards.forEach(renderCard);

// функция отправки формы
function handleFormSubmitCard (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderCard({
    name: formInputCardName.value,
    link: formInputCardLink.value,
  });
  
  evt.target.reset();
  closePopupClass(popupAdd);
  evt.submitter.disabled = true;
  evt.submitter.classList.add('popup__save_disabled');
}

// слушатели кнопок открыть-закрыть
buttonEdit.addEventListener('click', function() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopupClass(popupEdit);
});

profileCloseButton.addEventListener('click', function() {
  closePopupClass(popupEdit);
})

function openCardAdd() {
  openPopupClass(popupAdd);
}

buttonAdd.addEventListener('click', openCardAdd);

closeElementAdd.addEventListener('click', function() {
  closePopupClass(popupAdd);
})

closeBigImg.addEventListener('click', function() {
  closePopupClass(popupImg);
})

// слушатель закрытия попапа кликом на оверлей
popupEdit.addEventListener('mousedown', closePopupOverlay);
popupAdd.addEventListener('mousedown', closePopupOverlay);
popupImg.addEventListener('mousedown', closePopupOverlay);

//слушатели отправки форм
profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleFormSubmitCard);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
}
// вызов функции по валидации форм
enableValidation(validationConfig); 







