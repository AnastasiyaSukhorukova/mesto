import '../pages/index.css'; // добавьте импорт главного файла стилей 
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

// имена переменных называются со существительных, функции с глагола
// переменные попапов 
const popupEdit = document.querySelector('.profile-popup');
const popupAdd = document.querySelector('.popup-add');

// кнопки по открытию попапов
const buttonEditOpen = document.querySelector('.profile__button-edit');
const buttonAddOpen = document.querySelector('.profile__button-add');

// кнопки по закрытию попапов 
const buttonCloseEdit = popupEdit.querySelector('.popup__close'); 
const buttonCloseAdd = popupAdd.querySelector('.popup__close'); 

// переменные для хранения информации в попапах и формах

const profileForm = document.querySelector('.popup__edit-form');
const formElementAdd = document.querySelector('.popup__add-form');


// инпуты внутри попапов и формы
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const formInputCardName = document.querySelector('.popup__input_type_title');
const formInputCardLink = document.querySelector('.popup__input_type_link');

// переменные для добавления новых карточек
const cardsContainer = document.querySelector('.elements');

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
    createCard(item);
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
  popupWithFormAdd.open();
});

buttonCloseAdd.addEventListener('click', () => {
  popupWithFormAdd.close();
});

// валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
}

// проверка валидации для каждой формы
const profileValidation = new FormValidator(validationConfig, profileForm);
profileValidation.enableValidation();

const addValidation = new FormValidator(validationConfig, formElementAdd);
addValidation.enableValidation();






/*
const formInputCardName = document.querySelector('.popup__input_type_title');
const formInputCardLink = document.querySelector('.popup__input_type_link');
const userName = document.querySelector('.profile__intro-title');
const userJob = document.querySelector('.profile__intro-subtitle');
const titleImg = document.querySelector('.popup-image__title');
const bigImg = document.querySelector('.popup-image__img');*/



/*
// открытие попапов
function openPopupClass(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupClassEsc);
}

function openCardAdd() {
  addValidation.resetValidation();
  openPopupClass(popupAdd);
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

// закрытие попапов кликом на оверлей 
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopupClass(evt.target);
  }
}
*/


/*
// перебираем все попапы, навешиваем закрытие крестиком и кликом на оверлей
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  popup.addEventListener('mousedown', popupWithFormEdit.close());
  btn.addEventListener('click', () => popupWithFormEdit.close()); 
}) */
/*
//слушатели отправки форм
profileForm.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', handleFormSubmitCard);
*/

