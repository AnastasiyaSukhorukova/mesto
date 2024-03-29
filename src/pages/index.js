import '../pages/index.css'; // импорт главного файла стилей 

import {buttonEditOpen, buttonAddOpen, buttonCloseEdit, buttonCloseAdd, 
  profileForm, formElementAdd, nameInput, jobInput, formInputCardName, 
  formInputCardLink, cardsContainer, validationConfig, elementDelete, 
  avatarImg, avatarFormElement, buttonEditAvatar, buttonCloseAvatar, popupAvatar, options} from '../utils/constants.js'

import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'

const api = new Api (options);

let userId;

Promise.all([api.getInfoUser(), api.getInitialCards()])
.then(([user, initialCards]) => {
  userInfo.setUserInfo(user.name, user.about)
  userInfo.setUserAvatar(user.avatar)
  userId = user._id
  initialCards.forEach((item) => {
    createCard(item, userId)
  })
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
  });

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
        card.addLikeCardUser(res.likes)
      })
      .catch(() => {
        console.log('Произошла ошибка') // выведем ошибку в консоль
        })
    : api
    .addLikeCard(cardId)
    .then((res) => {
      card.addLikeCardUser(res.likes)
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
      });
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

// добавление новой карточки
const createNewCard = (card) => {
  popupWithFormAdd.saveButton('Сохранение...')
  api
  .createInitialCards(card.name, card.link)
  .then((item) => {
    const cardNew = createCard(item, userId)
    popupWithFormAdd.close()
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    })
  .finally(() => {
    popupWithFormAdd.saveButton('Сохранить')
  });
}

// удаление карточки (свои можно, чужие нет)
const deleteCardElement = (id, element) => {
  api
  .deleteCard(id)
  .then((res) => {
    popupWithDeleteCard.deleteCard()
    popupWithDeleteCard.close()
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    })
}

// создание экземляра класса для открытия попапа удаления карточки
const popupWithDeleteCard = new PopupWithConfirmation('.popup-delete', (id, card) => {
  deleteCardElement(id, card)
});
popupWithDeleteCard.setEventListeners();

// функция по редактированию аватара 
function handleProfileAvatar() {
  popupWithFormAvatar.saveButton('Сохранение...')
  api 
  .editAvatarUser(avatarImg.value)
  .then((res) => {
    userInfo.setUserAvatar(res.avatar)
    popupWithFormAvatar.close()
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    })
  .finally(() => {
    popupWithFormAvatar.saveButton('Сохранить')
  });
}

// функция по редактированию данных пользователя
const handleProfileFormSubmit = (item) => {
  popupWithFormEdit.saveButton('Сохранение...')
  api
  .editInfoUser(item.name, item.about)
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about)
    popupWithFormEdit.close()
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    })
  .finally(() => {
    popupWithFormEdit.saveButton('Сохранить')
  });
}

// экземляр класса с формой 
const popupWithFormEdit = new PopupWithForm('.profile-popup', handleProfileFormSubmit);
popupWithFormEdit.setEventListeners();

// экземляр класса с формой 
const popupWithFormAvatar = new PopupWithForm('.popup-new-avatar', handleProfileAvatar);
popupWithFormAvatar.setEventListeners();

const popupWithFormAdd = new PopupWithForm('.popup-add', createNewCard);
popupWithFormAdd.setEventListeners();

const userInfo = new UserInfo ({
  userName: '.profile__intro-title',
  userInfo: '.profile__intro-subtitle',
  avatar: '.profile__avatar'
})

// открытие попапа редактирования профиля
buttonEditOpen.addEventListener('click', () => {
  profileValidation.resetValidation();
  popupWithFormEdit.checkInputList(userInfo.getUserInfo())
  popupWithFormEdit.open();
});
/*
buttonCloseEdit.addEventListener('click', () => {
  popupWithFormEdit.close();
});*/

// обновить аватар
buttonEditAvatar.addEventListener('click', () => { 
  avatarValidation.resetValidation();
  popupWithFormAvatar.open();
})
/*
buttonCloseAvatar.addEventListener('click', () => {
  popupWithFormAvatar.close();
});*/


buttonAddOpen.addEventListener('click', () => {
  addValidation.resetValidation();
  popupWithFormAdd.open();
});
/*
buttonCloseAdd.addEventListener('click', () => {
  popupWithFormAdd.close();
});*/

// проверка валидации для каждой формы
const profileValidation = new FormValidator(validationConfig, profileForm);
profileValidation.enableValidation();

const addValidation = new FormValidator(validationConfig, formElementAdd);
addValidation.enableValidation();

const avatarValidation = new FormValidator(validationConfig, avatarFormElement);
avatarValidation.enableValidation();


