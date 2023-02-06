import '../pages/index.css'; // импорт главного файла стилей 

import {buttonEditOpen, buttonAddOpen, buttonCloseEdit, buttonCloseAdd, 
  profileForm, formElementAdd, nameInput, jobInput, formInputCardName, 
  formInputCardLink, cardsContainer, initialCards, validationConfig} from '../utils/constants.js'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

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
  const cardItem = createCard(item);
  section.addItem(cardItem);  
  return renderCard;
}  

const section = new Section ({
  items: initialCards, 
  renderer: (item) => {
    section.addItem(createCard(item)); 
  }
}, cardsContainer);
section.renderItems();

// функция отправки формы с инф-цией профиля
function handleProfileFormSubmit (formValues) { 
  userInfo.setUserInfo(formValues.name, formValues.info);
}

// экземляр класса с формой 
const popupWithFormEdit = new PopupWithForm('.profile-popup', handleProfileFormSubmit);
popupWithFormEdit.setEventListeners();

// функция отправки формы
function handleFormSubmitCard () {
  const newCard = {
    name: formInputCardName.value, 
    link: formInputCardLink.value
  }
  renderCard(newCard);
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
  const {name, info} = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = info;
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


