import '../pages/index.css'; // импорт главного файла стилей 

import {buttonEditOpen, buttonAddOpen, buttonCloseEdit, buttonCloseAdd, 
  profileForm, formElementAdd, nameInput, jobInput, formInputCardName, 
  formInputCardLink, cardsContainer, validationConfig, elementDelete, 
  avatarImg, avatarFormElement} from '../utils/constants.js'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'

const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'f1b678bd-8daa-4ddc-9a95-4730e9a93182',
    'Content-Type': 'application/json'
  }
}

const api = new Api(options);
/*
api.getInitialCards()
.then((initialCards) => {
 // userId = userData._id;
  section.renderItems(initialCards)
})
.catch(() => {
  console.log('Произошла ошибка'); // выведем ошибку в консоль
  }); */

let userId;

Promise.all([api.getInfoUser(), api.getInitialCards()])
.then(([user, cardList]) => {
  userInfo.setUserInfo(user.name, user.about)
  userInfo.setUserAvatar(user.avatar)
  userId = user._id
  cardList.forEach((item) => {
    createCard(item, userId)
  })
  .catch(() => {
    console.log('Произошла ошибка') // выведем ошибку в консоль
    })
})

// Экземпляры классов
const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();

const section = new Section ({ 
  items: [], 
  createCard
}, cardsContainer);

// добавление новой карточки 
const createCard = (item, userId) => {  
  const card = new Card (item, userId, '#cards', {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link)
    }, 
    handleLikeClick: (cardId) => {
      card.checkLikesUser()
      ? api
      .deleteLikeCard(cardId)
      .then((res) => {
        card.addLikeCard(res.likes)
      })
      .catch(() => {
        console.log('Произошла ошибка') // выведем ошибку в консоль
        })
    : api
    .addLikeCard(cardId)
    .then((res) => {
      card.addLikeCard(res.likes)
    })
    .catch(() => {
      console.log('Произошла ошибка') // выведем ошибку в консоль
      })
    },
    handleDeleteCards: (id, card) => {
      popupWithDeleteCard.open(id, card)
    }
  }); 
   
  const cardElement = card.generateCard();  
  section.addItem(cardElement);
} 

// отражение карточек
section.renderItems;
/*
function renderCard(item) {  
  api.createInitialCards(item)
  .then((item) => {
    section.addItem(createCard(item))
  })  
  .catch(() => {
    console.log('Произошла ошибка'); // выведем ошибку в консоль
    }); 
  return renderCard;
} */

// добавление новой карточки
const createNewCard = (element) => {
  popupWithFormAdd.saveButton('Сохранение...')
  api
  .createNewCard(element.name, element.link)
  .then((item) => {
    const cardNew = createCard(item, userId)
    popupWithFormAdd.close()
    popupWithFormAdd.saveButton('Сохранить')
  })
  .catch(() => {
    console.log('Произошла ошибка') // выведем ошибку в консоль
    })
}

// удаление карточки (свои можно, чужие нет)
const deleteCardElement = (id, element) => {
  api
  .deleteCard(id)
  .then((res) => {
    popupWithDeleteCard.deleteCard()
    popupWithDeleteCard.close()
  })
  .catch(() => {
    console.log('Произошла ошибка') // выведем ошибку в консоль
    })
}

// создание экземляра класса для открытия попапа удаления карточки
const popupWithDeleteCard = new PopupWithConfirmation('.popup-delete', (id, card) => {
  deleteCardElement(id, card)
});
popupWithDeleteCard.setEventListeners();

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


