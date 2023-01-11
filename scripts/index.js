
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
//const template = document.querySelector('#cards').content.querySelector('.element');
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
/*
// Функция, которая принимает аргументом объект который содержит name и link
function createCard(cardsData) {
  // клонируем контент темплейт
  const newCard = template.cloneNode(true);

  // создаем новую карточку - задаем название, альты и ссылку
  newCard.querySelector('.element__title').textContent = cardsData.name;
  const elementCardImg = newCard.querySelector('.element__image');
  elementCardImg.alt = cardsData.name;
  elementCardImg.src = cardsData.link;

  // переменная и слушатель на кнопку удалить и лайк
  const cardDelete = newCard.querySelector('.element__delete');
  cardDelete.addEventListener('click', handleDeleteCards);

  const cardLike = newCard.querySelector('.element__like');
  cardLike.addEventListener('click', handleLikeCard);

  elementCardImg.addEventListener('click', function() {
    bigImg.src = cardsData.link;
    bigImg.alt = cardsData.name;
    titleImg.textContent = cardsData.name;
    openPopupClass(popupImg);
  });

  return newCard;

};
*/
// класс Card, который создаёт карточку с текстом и ссылкой на изображение
//export default 
class Card {
  // принимает в конструктор её данные и селектор её template-элемента;
  constructor(cardsData, templateSelector, openBidImg) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._templateSelector = templateSelector;
    this._openBidImg = openBidImg;
  }

  // содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
  _getTemplate() {
    const newCard = document
      .querySelector('#cards')
      .content
      .querySelector('.element')
      .cloneNode(true);

    return newCard;
  }

  // содержит один публичный метод, 
  // который возвращает полностью работоспособный и наполненный данными элемент карточки.
  generateCard() {
    this._newCard = this._getTemplate();
    this._setEventListeners();

    this._titleImg = this._newCard.querySelector('.element__title'); // название картинки
    this._elementImg = this._newCard.querySelector('.element__image'); // ссылка на картинку

    this._titleImg.textContent = this._name;
    this._elementImg.alt = this._name;
    this._elementImg.src = this._link;

    return this._newCard;
  }

  // функция удаления карточек
  _handleDeleteCards() {
    this._newCard.target.closest('.element').remove();
}

  // функция лайков, при мажатии на кликнутый элемент добавляется/убирается булевый модификатор 
  _handleLikeCard() {
    this._newCard.target.classList.toggle('element__like_active');
}



  _setEventListeners() {
  // переменная и слушатель на кнопку удалить и лайк
    this._newCard.querySelector('.element__delete').addEventListener('click', () => {
    this._handleDeleteCards()
  })

    this._newCard.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeCard()
    })

  // открытие картинки на весь экран
    this._newCard.querySelector('.element__image').addEventListener('click', () => {
      this._openBidImg(this._name, this._link)
    });
  }
  };

// функция по открытию попапа с картинкой 
  function openBidImg(name, link) {
    bigImg.src = link;
    bigImg.alt = name;
    titleImg.textContent = name;
    openPopupClass(popupImg);
  }
/*
// функция удаления карточек
function handleDeleteCards(evt) {
  evt.target.closest('.element').remove();
}

// функция лайков, при мажатии на кликнутый элемент добавляется/убирается булевый модификатор 
function handleLikeCard(evt) {
  evt.target.classList.toggle('element__like_active');
}
*/
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

validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
}
// вызов функции по валидации форм
enableValidation(validationConfig); 







