import '../pages/index.css'; // импорт главного файла стилей 

import {buttonEditOpen, buttonAddOpen, buttonCloseEdit, buttonCloseAdd, 
  profileForm, formElementAdd, nameInput, jobInput, formInputCardName, 
  formInputCardLink, cardsContainer, validationConfig, elementDelete} from '../utils/constants.js'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

// Экземпляры классов
const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();

const createCard = (item) => {  
  const card = new Card (item, '#cards', handleCardClick);  
  const cardElement = card.generateCard();  
  return cardElement; 
} 

// функция по открытию попапа с картинкой 
const handleCardClick = (name, link) => {
popupWithImage.open(name, link);
} 

function renderCard(item) {  
  api.createInitialCards(item)
  .then((item) => {
    section.addItem(createCard(item))
  })  
  return renderCard;
} 

const section = new Section ({ 
  renderer: (item) => {
    section.addItem(createCard(item)); 
  }
}, cardsContainer);

// функция отправки формы с инф-цией профиля
function handleProfileFormSubmit (formValues) { 
  userInfo.setUserInfo(formValues.name, formValues.info);
}

// экземляр класса с формой 
const popupWithFormEdit = new PopupWithForm('.profile-popup', handleProfileFormSubmit);
popupWithFormEdit.setEventListeners();

// функция отправки формы
function handleFormSubmitCard (values) {
  renderCard(values);
  popupWithFormAdd.close();
}

const popupWithFormAdd = new PopupWithForm('.popup-add', handleFormSubmitCard);
popupWithFormAdd.setEventListeners();

const userInfo = new UserInfo ({
  userName: '.profile__intro-title',
  userInfo: '.profile__intro-subtitle'
})

// слушатели открытия-закрытия попапов форм
buttonEditOpen.addEventListener('click', () => {
  profileValidation.resetValidation();
  const {name, about} = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = about;
  popupWithFormEdit.open();
});

buttonCloseEdit.addEventListener('click', () => {
  popupWithFormEdit.close();
});

buttonAddOpen.addEventListener('click', () => {
  addValidation.resetValidation();
  popupWithFormAdd.open();
});

buttonCloseAdd.addEventListener('click', () => {
  popupWithFormAdd.close();
});

// проверка валидации для каждой формы
const profileValidation = new FormValidator(validationConfig, profileForm);
profileValidation.enableValidation();

const addValidation = new FormValidator(validationConfig, formElementAdd);
addValidation.enableValidation();

/*
// создание экземляра класса для открытия попапа удаления карточки
const popupWithDeleteCard = new PopupWithConfirmation('.popup-delete');
popupWithDeleteCard.setEventListeners();*/
/*
// открытие попапа удаления карточки
elementDelete.addEventListener('click', () => {
  popupWithDeleteCard.open();
})*/

const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-60/cards',
  headers: {
    authorization: 'f1b678bd-8daa-4ddc-9a95-4730e9a93182',
    'Content-Type': 'application/json'
  }
}

const api = new Api(options);

api.getInitialCards()
.then((initialCards) => {
  section.renderItems(initialCards)
})
