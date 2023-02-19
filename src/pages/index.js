import '../pages/index.css'; // импорт главного файла стилей 

import {buttonEditOpen, buttonAddOpen, buttonCloseEdit, buttonCloseAdd, 
  profileForm, formElementAdd, nameInput, jobInput, formInputCardName, 
  formInputCardLink, cardsContainer, validationConfig, elementDelete, avatarImg, avatarFormElement} from '../utils/constants.js'

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

//let userId;
const createCard = (item) => {  
  const card = new Card (item, '#cards', {handleCardClick});  
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
  .catch(() => {
    console.log('Произошла ошибка'); // выведем ошибку в консоль
    }); 
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

function handleProfileAvatar() {
  console.log('123');
  //userInfo.setUserAvatar(values.avatar)
}

// экземляр класса с формой 
const popupWithFormEdit = new PopupWithForm('.profile-popup', handleProfileFormSubmit);
popupWithFormEdit.setEventListeners();

// экземляр класса с формой 
const popupWithFormAvatar = new PopupWithForm('.popup-new-avatar', handleProfileAvatar);
popupWithFormAvatar.setEventListeners();

// функция отправки формы
function handleFormSubmitCard (values) {
  renderCard(values);
  popupWithFormAdd.close();
}

const popupWithFormAdd = new PopupWithForm('.popup-add', handleFormSubmitCard);
popupWithFormAdd.setEventListeners();

const userInfo = new UserInfo ({
  userName: '.profile__intro-title',
  userInfo: '.profile__intro-subtitle',
  avatar: '.profile__avatar'
})

// слушатели открытия-закрытия попапов форм
buttonEditOpen.addEventListener('click', () => {
  profileValidation.resetValidation();
  /*
  userApi.getInitialCards()
  .then((name, about, avatarImg) => {
    userInfo.getUserInfo();
    avatar.value = avatarImg;
    nameInput.value = name;
    jobInput.value = about;
  })
  .catch(() => {
  console.log('Произошла ошибка'); // выведем ошибку в консоль
  });*/
  const {name, about, avatar} = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = about;
  avatarImg.value = avatar;
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

const avatarValidation = new FormValidator(validationConfig, formElementAdd);
avatarValidation.enableValidation();
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
  url: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'f1b678bd-8daa-4ddc-9a95-4730e9a93182',
    'Content-Type': 'application/json'
  }
}

const api = new Api(options);

api.getInitialCards()
.then((initialCards) => {
 // userId = userData._id;
  section.renderItems(initialCards)
})
.catch(() => {
  console.log('Произошла ошибка'); // выведем ошибку в консоль
  }); 

