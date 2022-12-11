
const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__button-edit');
const closeElement = document.querySelector('.popup__close');
const closeElementAdd = document.querySelector('.popup__add-close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const saveButton = document.querySelector('.popup__save');
const userName = document.querySelector('.profile__intro-title');
const userJob = document.querySelector('.profile__intro-subtitle');

const buttonAdd = document.querySelector('.profile__button-add');
const popupAdd = document.querySelector('.popup__add'); // кнопка редактирования карточек

const formInputCardName = document.querySelector('.popup__input_type_title');
const formInputCardLink = document.querySelector('.popup__input_type_link');

// нашли темплейт и взяли из него контент 
const template = document.querySelector('#cards').content.querySelector('.element');
// Переменная куда нужно будет добавлять новые карточки
const elementCards = document.querySelector('.elements');
// форма добавления новых карточек
const formElementAdd = document.querySelector('.popup__add-form');
// кнопка создать новую карточку
const inputAdd = document.querySelector('.popup__add-input');
// кнопка удалить 
const buttonDel = document.querySelector('.element__delete');

const popupImg = document.querySelector('.popup-image');
const titleImg = document.querySelector('.popup-image__title');
const BigImg = document.querySelector('.popup-image__img');

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

// открытие попапа редактирование профиля
function openedPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

// открытие попапа добавления карточки
function openedPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

// закрытие попапа редактирования профиля
function closePopup() {
  popup.classList.remove('popup_opened');
}

// закрытие попапа добавления карточек
function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}

// открытие попапа с картинкой на весь экран 
function openedPopupImg() {
  popupImg.classList.add('popup_opened');
}

// функция отправки формы с инф-цией профиля
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  closePopup();
}

// функция удаления карточек
function handleDeleteCards(evt) {
  evt.target.closest('.element').remove();
}

// функция лайков, при мажатии на ближаший класс добавляется/убирается булевый модификатор 
function handleLikeCard(evt) {
  evt.target.closest('.element__like').classList.toggle('element__like_active');
}

// Функция, которая принимает аргументом объект который содержит name и link
function inputCards(cardsData) {
  // клонируем контент темплейт
  const newCards = template.cloneNode(true);

  // создаем новую карточку - задаем название, альты и ссылку
  newCards.querySelector('.element__title').textContent = cardsData.name;
  newCards.querySelector('.element__image').alt = cardsData.name;
  newCards.querySelector('.element__image').src = cardsData.link;

  // переменная и слушатель на кнопку удалить и лайк
  const cardDelete = newCards.querySelector('.element__delete');
  cardDelete.addEventListener('click', handleDeleteCards);

  const cardLike = newCards.querySelector('.element__like');
  cardLike.addEventListener('click', handleLikeCard);

  return newCards;

};

// функция которая добавляет карточки в начало элемента elements 
function renderCard(cardsData) {
  elementCards.prepend(inputCards(cardsData));
}

// с помощью forEach перебираем массив 
initialCards.forEach(function(cardsData) {
  renderCard(cardsData);
});

// функция отправки формы
function handleFormSubmitCard (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderCard({
    name: formInputCardName.value,
    link: formInputCardLink.value,
  });
  
  evt.target.reset();
  closePopupAdd(popupAdd);
}

// слушатели кнопок открыть-закрыть
buttonEdit.addEventListener('click', openedPopup);
buttonAdd.addEventListener('click', openedPopupAdd);

closeElementAdd.addEventListener('click', closePopupAdd);
closeElement.addEventListener('click', closePopup);

//слушатели отправки форм
formElement.addEventListener('submit', handleFormSubmit);
formElementAdd.addEventListener('submit', handleFormSubmitCard);












