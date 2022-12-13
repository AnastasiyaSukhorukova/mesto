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
const template = document.querySelector('#cards').content.querySelector('.element');
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
function toogleOpenPopupClass(popup) {
  popup.classList.toggle('popup_opened');
}

// закрытие попапов
function toogleClosePopupClass(popup) {
  popup.classList.toggle('popup_opened');
}

// функция отправки формы с инф-цией профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  toogleClosePopupClass(popupEdit);
}

// функция удаления карточек
function handleDeleteCards(evt) {
  evt.target.closest('.element').remove();
}

// функция лайков, при мажатии на ближаший класс добавляется/убирается булевый модификатор 
function handleLikeCard(evt) {
  evt.target.classList.toggle('element__like_active');
}

// Функция, которая принимает аргументом объект который содержит name и link
function createCard(cardsData) {
  // клонируем контент темплейт
  const newCards = template.cloneNode(true);

  // создаем новую карточку - задаем название, альты и ссылку
  newCards.querySelector('.element__title').textContent = cardsData.name;
  const elementCardImg = newCards.querySelector('.element__image');
  elementCardImg.alt = cardsData.name;
  elementCardImg.src = cardsData.link;

  // переменная и слушатель на кнопку удалить и лайк
  const cardDelete = newCards.querySelector('.element__delete');
  cardDelete.addEventListener('click', handleDeleteCards);

  const cardLike = newCards.querySelector('.element__like');
  cardLike.addEventListener('click', handleLikeCard);

  elementCardImg.addEventListener('click', function() {
    bigImg.src = cardsData.link;
    bigImg.alt = cardsData.name;
    titleImg.textContent = cardsData.name;
    toogleClosePopupClass(popupImg);
  });

  return newCards;

};

// функция которая добавляет карточки в начало элемента elements 
function renderCard(cardsData) {
  elementCards.prepend(createCard(cardsData));
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
  toogleClosePopupClass(popupAdd);
}

// слушатели кнопок открыть-закрыть
buttonEdit.addEventListener('click', function() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  toogleOpenPopupClass(popupEdit);
});

profileCloseButton.addEventListener('click', function() {
  toogleClosePopupClass(popupEdit);
})

buttonAdd.addEventListener('click', function() {
  toogleOpenPopupClass(popupAdd);
})

closeElementAdd.addEventListener('click', function() {
  toogleClosePopupClass(popupAdd);
})

closeBigImg.addEventListener('click', function() {
  toogleClosePopupClass(popupImg);
})

//слушатели отправки форм
profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleFormSubmitCard);












